const fs = require('fs');
const solFileName = require('path');
const { readFileSync } = require('fs');
const chalk = require('chalk');
const { HardhatPluginError } = require('hardhat/plugins');
const fs_extra_1 = require("fs-extra");
let utf8Encode = new TextEncoder();
let utf8decoder = new TextDecoder();

const {
  TASK_COMPILE,
  TASK_CLEAN,
} = require('hardhat/builtin-tasks/task-names');
var util = require('util');
const { assert } = require('console');


extendEnvironment((hre) => {
  hre.hi = "Hello, Hardhat!";
});


task(
  'compat-check', 'check rollup compatibility of compiled contracts'
).addParam(
  'chain', 'target chain(supported: scroll, polygon, optimism)', "scroll", undefined, true
).setAction(async function (args, hre) {
  console.log("cleaning cache...");
  await hre.run(TASK_CLEAN);
  console.log("compiling...");
  await hre.run(TASK_COMPILE);
  let msg = "checking compatibility of [" + chalk.bold.red(args.chain) + "]...";
  console.log(msg);

  let l2Instructions = l2Support(args.chain);
  if (l2Instructions == null) {
    let errMsg = util.format(`We don't support layer2 chain [%s]!
supported layer2: scroll, polygon, optimism`, args.chain);
    console.log(chalk.bold.red(errMsg));
    return;
  }
  let scanResults = {};

  const paths = await hre.artifacts.getBuildInfoPaths();
  paths.forEach((path) => {
    let buff = fs.readFileSync(path);
    buildInfo = JSON.parse(buff);
    let contracts = buildInfo["output"]["contracts"];
    for (let solFileName in contracts) {
      let sources = buildInfo['input']['sources'];
      let solContent = sources[solFileName]["content"];
      sources[solFileName]["lineMaps"] = [{ begin: 0, end: 0 }];

      //for utf-8 string, like chinese character
      let contentBytes = utf8Encode.encode(solContent);
      let begin = 0;
      for (let j = 0; j < contentBytes.length; j++) {
        let c = contentBytes[j];
        if (c == 0x0A) { // 0x0A is "\n"
          sources[solFileName]["lineMaps"].push({ begin: begin, end: j });
          begin = j + 1;
        }
      }
      sources[solFileName]["lineMaps"].push({ begin: begin, end: contentBytes.length });
    }

    for (let solFileName in contracts) {
      let contractJson = contracts[solFileName];
      for (let contractName in contractJson) {
        let legacyAssembly = contracts[solFileName][contractName]["evm"]["legacyAssembly"];
        scanAsm(legacyAssembly, l2Instructions, buildInfo, scanResults);
      }
    }
  });
});

function scanAsm(obj, l2Instructions, buildJson, scanResults) {
  for (let key in obj) {
    if (obj instanceof Object == false) {
      return;
    }
    if (key == ".code") {
      var code = obj[key];
      for (let i = 0; i < code.length; i++) {

        let begin = code[i]['begin'];
        let end = code[i]['end'];
        let opName = code[i]['name'];
        let value = code[i]['value'];
        let source = code[i]['source'];
        opName = opName.split(' ')[0];

        if (opName in l2Instructions["opcases"]) {
          let k = source + ':' + begin + ',' + end + opName;
          if (scanResults.hasOwnProperty(k)) {
            continue;
          }

          let keys = Object.keys(buildJson["input"]['sources']);
          let solFileName = keys[source];

          let lineMaps = buildJson["input"]['sources'][solFileName]['lineMaps'];
          let sourceCode = buildJson["input"]['sources'][solFileName]['content'];
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
          const warning = chalk.keyword('yellow');
          let msg = warning(util.format("You are using opcode: %s, may have difference behaviour from ethereum.", opName));
          msg += util.format('\n--> %s:%d,%d', solFileName, lineStart, 1 + begin - lineMaps[lineStart].begin);
          let tmpArr = [];

          //for utf-8 string, like chinese character
          let contentBytes = utf8Encode.encode(sourceCode);
          const underStart = utf8Encode.encode("\033[31;1;4m");
          const underEnd = utf8Encode.encode("\033[0m");

          let underline = false;
          for (let lineNumber = lineStart; lineNumber <= lineEnd; lineNumber++) {
            let line = lineMaps[lineNumber];
            if (underline) {
              tmpArr.push(underEnd);
            }
            let prefix = utf8Encode.encode(chalk.cyan(util.format("\n%d |", lineNumber)));
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
          console.log(msg);
          console.log('--------------------------------------------');
          scanResults[k] = msg;
        }
      }
    }
    else {
      scanAsm(obj[key], l2Instructions, buildJson, scanResults);
    }
  }
}

//TODO create a web server replace this function
function l2Support(l2Name) {
  try {
    const data = readFileSync("././hardhat-contract-compat-check/l2results/" + l2Name + '.json');
    var l2TestResult = JSON.parse(data);
    return l2TestResult;
  }
  catch (err) {
    if (err.code === 'ENOENT') {
      return null;
    } else {
      throw err;
    }
  }
}
