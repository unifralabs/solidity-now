const fs = require('fs');
const solFileName = require('path');
const {readFileSync} = require('fs');
const chalk = require('chalk');
const {HardhatPluginError} = require('hardhat/plugins');
const fs_extra_1 = require("fs-extra");
let utf8Encode = new TextEncoder();
let utf8decoder = new TextDecoder();

const {
    TASK_COMPILE,
    TASK_CLEAN,
} = require('hardhat/builtin-tasks/task-names');
var util = require('util');
const {assert} = require('console');


extendEnvironment((hre) => {
    hre.hi = "Hello, Hardhat!";
});


task(
    'compat-check', 'check rollup compatibility of compiled contracts'
).addParam(
    'chain', 'target chain(supported: scroll, polygon, optimism, zksync)', "scroll", undefined, true
).setAction(async function (args, hre) {
    console.log("cleaning cache...");
    await hre.run(TASK_CLEAN);
    console.log("compiling...");
    await hre.run(TASK_COMPILE);
    let msg = "checking compatibility of [" + chalk.bold(args.chain) + "]...";
    console.log(msg);

    let l2Instructions = l2Support(args.chain);
    if (l2Instructions == null) {
        let errMsg = util.format(
            "We don't support layer2 chain [%s]!\nsupported layer2: scroll, polygon, optimism, zksync", args.chain);
        console.log(chalk.bold.red(errMsg));
        return;
    }
    let scanResults = {};

    const paths = await hre.artifacts.getBuildInfoPaths();
    paths.forEach((path) => {
        let buff = fs.readFileSync(path);
        buildInfo = JSON.parse(buff);
        let {solcVersion} = buildInfo;
        if (cmpVersions(solcVersion, "0.6.3") < 0) {
            console.log('solcVersion', solcVersion, "not support compatibility checking. Need solc version >=0.6.3")
            return;
        }
        let contracts = buildInfo["output"]["contracts"];
        for (let solFileName in contracts) {
            let sources = buildInfo['input']['sources'];
            let solContent = sources[solFileName]["content"];
            sources[solFileName]["lineMaps"] = [{begin: 0, end: 0}];

            //for utf-8 string, like chinese character
            let contentBytes = utf8Encode.encode(solContent);
            let begin = 0;
            for (let j = 0; j < contentBytes.length; j++) {
                let c = contentBytes[j];
                if (c == 0x0A) { // 0x0A is "\n"
                    sources[solFileName]["lineMaps"].push({begin: begin, end: j});
                    begin = j + 1;
                }
            }
            sources[solFileName]["lineMaps"].push({begin: begin, end: contentBytes.length});
        }

        for (let solFileName in contracts) {
            let contractJson = contracts[solFileName];
            for (let contractName in contractJson) {
                let legacyAssembly = contracts[solFileName][contractName]["evm"]["legacyAssembly"];
                scanAsm(legacyAssembly, l2Instructions, buildInfo, scanResults);
            }
        }
    });
    console.log("checking compatibility of [" + chalk.bold(args.chain) + "] done");
});

function scanAsm(asm, l2Instructions, buildJson, scanResults) {
    for (let key in asm) {
        if (asm instanceof Object == false) {
            return;
        }
        if (key != '.code') {
            scanAsm(asm[key], l2Instructions, buildJson, scanResults);
            continue;
        }

        let code = asm[key];
        for (let i = 0; i < code.length; i++) {
            let {begin, end, name, source} = code[i];
            // if (source == null) {

            // }
            name = name.split(' ')[0];
            if (name == 'tag' || name == "PUSH") {
                continue;
            }

            if (false == name in l2Instructions['result']) {
                //console.log("opcode not found, submit a issue please. opcode=", name);
                continue;
            }

            let {compat, desc} = l2Instructions['result'][name];
            if (compat == 'ok') {
                continue;
            }
            let msg = "";
            if (compat == 'undefined') {
                msg = ("error: opcode [" + name + "] not supported. " + desc);
            } else if (compat == "warn") {
                msg = ("Warning: opcode [" + name + "], may have difference behaviour with ethereum. " + desc);
            } else {
                console.log("unknown compat level!");
                continue;
            }


            let k = source + ':' + begin + ',' + end + '_' + name;
            //to avoid output multiple times
            if (scanResults.hasOwnProperty(k)) {
                continue;
            }

            let sourceFileNames = Object.keys(buildJson["output"]['sources']);

            let solFileName = '';
            solFileName = sourceFileNames[source];

            if (!buildJson["input"]['sources'].hasOwnProperty(solFileName)) {
                console.log("solFileName not found!", solFileName);
                continue;
            }
            if (!buildJson["input"]['sources'][solFileName].hasOwnProperty("lineMaps")) {
                console.log("lineMaps not found!", solFileName);
                continue;
                //console.log(buildJson["input"]['sources']);
                return;
            }
            let {content} = buildJson["input"]['sources'][solFileName];
            let lineMaps = buildJson["input"]['sources'][solFileName]['lineMaps'];

            function getLine(offset, lines, left, right) {
                if (right == left) {
                    return left;
                }
                let mid = Math.floor((left + right) / 2);
                if (offset < lines[mid].begin) {
                    return getLine(offset, lines, left, mid);
                }
                if (offset > lines[mid].end) {
                    return getLine(offset, lines, mid + 1, right);
                }
                return mid;
            }

            let lineStart = getLine(begin, lineMaps, 1, lineMaps.length - 1);
            let lineEnd = getLine(end, lineMaps, 1, lineMaps.length - 1);


            msg += util.format('\n--> %s:%d,%d', solFileName, lineStart, 1 + begin - lineMaps[lineStart].begin);
            let tmpArr = [];

            //for utf-8 string, like chinese character
            let contentBytes = utf8Encode.encode(content);
            const underStart = utf8Encode.encode("\033[4m");
            const underEnd = utf8Encode.encode("\033[24m");

            let underline = false;
            for (let lineNumber = lineStart; lineNumber <= lineEnd; lineNumber++) {
                let line = lineMaps[lineNumber];
                if (underline) {
                    tmpArr.push(underEnd);
                }
                let prefix = utf8Encode.encode((util.format("\n%d |", lineNumber)));
                tmpArr.push(prefix);
                if (underline) {
                    tmpArr.push(underStart);
                }

                if (begin >= line.begin) {
                    tmpArr.push(contentBytes.subarray(line.begin, begin));
                    tmpArr.push(underStart);
                    underline = true;
                }

                let b = Math.max(line.begin, begin);
                if (end <= line.end) {
                    tmpArr.push(contentBytes.subarray(b, end));
                    tmpArr.push(underEnd);
                    underline = false;
                    tmpArr.push(contentBytes.subarray(end, line.end));
                } else {
                    var x = contentBytes.subarray(b, line.end);
                    tmpArr.push(x);
                    if (underline) {
                        tmpArr.push(underEnd);
                    }
                }
            }

            let length = 0;
            tmpArr.forEach(item => {
                length += item.length;
            });
            let mergedArray = new Uint8Array(length);
            let _len = 0;
            tmpArr.forEach(item => {
                mergedArray.set(item, _len);
                _len += item.length;
            });

            msg += utf8decoder.decode(mergedArray);
            if (compat == 'warn') {
                console.log(chalk.yellow(msg));
            } else if (compat == "undefined") {
                console.log(chalk.bold.red(msg));
            }

            console.log('\n\n');
            scanResults[k] = msg;
        }
    }
}

//TODO create a web server replace this function
function l2Support(l2Name) {
    try {
        const data = readFileSync(__dirname + "/l2results/" + l2Name + '.json');
        var l2TestResult = JSON.parse(data);
        return l2TestResult;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return null;
        } else {
            throw err;
        }
    }
}

function cmpVersions(a, b) {
    var i, diff;
    var regExStrip0 = /(\.0+)+$/;
    var segmentsA = a.replace(regExStrip0, '').split('.');
    var segmentsB = b.replace(regExStrip0, '').split('.');
    var l = Math.min(segmentsA.length, segmentsB.length);

    for (i = 0; i < l; i++) {
        diff = parseInt(segmentsA[i], 10) - parseInt(segmentsB[i], 10);
        if (diff) {
            return diff;
        }
    }
    return segmentsA.length - segmentsB.length;
}