const fs = require('fs');
const solFileName = require('path');
const { readFileSync } = require('fs');
const chalk = require('chalk');
const { HardhatPluginError } = require('hardhat/plugins');
const {
  TASK_COMPILE,
  TASK_CLEAN,
} = require('hardhat/builtin-tasks/task-names');
var util = require('util');


extendEnvironment((hre) => {
  hre.hi = "Hello, Hardhat!";
});

var l2Results = {};
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
        opName = opName.split(' ');

        if (opName in l2Instructions["opcases"]) {
          let k = source + ':' + begin + ',' + end + opName;
          if (scanResults.hasOwnProperty(k)) {
            continue;
          }

          let keys = Object.keys(buildJson["input"]['sources']);
          let solFileName = keys[source];

          let maps = buildJson["input"]['sources'][solFileName]['maps'];
          let content = buildJson["input"]['sources'][solFileName]['content'];
          function getLine(offset, lines, left, right) {
            if (left == right) {
              return left;
            }
            let mid = Math.floor((left + right) / 2);
            if (offset < lines[mid].begin) {
              return getLine(offset, lines, left, mid);
            }
            if (offset > lines[mid].end) {
              return getLine(offset, lines, mid, right);
            }
            return mid;
          }

          let lineStart = getLine(begin, maps, 1, maps.length - 1);
          let lineEnd = getLine(end, maps, 1, maps.length - 1);
          const warning = chalk.keyword('yellow');
          let msg = warning(util.format("You are using opcode: %s, may have difference behaviour from ethereum.\n--> ", opName));

          msg += util.format('%s:%d --> %d\n', solFileName, lineStart, lineEnd);
          for (let line = lineStart; line <= lineEnd; line++) {
            msg += chalk.keyword('cyan')(util.format(`%d |`, line));
            for (let pos = maps[line].begin; pos <= maps[line].end; pos++) {
              if (begin <= pos && pos < end) {
                msg += chalk.underline(content[pos]);
              } else {
                msg += content[pos];
              }
            }
            //msg += chalk.underline(content.substr(maps[line].begin, maps[line].end - maps[line].begin));
            // msg += "\n";
            // var underLine = "";
            // for (let i = 0; i < (line.toString(10) + " |").length; i++) {
            //   underLine += ' ';
            // }
            // for (let n = maps[line].begin; n < maps[line].end; n++) {
            //   if (begin <= n && n <= end) {
            //     underLine += '^';
            //   } else {
            //     underLine += ' ';
            //   }
            // }
            // msg += chalk.keyword('yellow')(underLine);
            // msg += "\n";
          }

          console.log(msg);
          scanResults[k] = msg;
        }
      }
    }
    else {
      scanAsm(obj[key], l2Instructions, buildJson, scanResults);
    }
  }
}

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

task(
  'compat-check', 'check rollup compatibility of compiled contracts'
).addFlag(
  'chain', 'target chain(default to: scroll)'
).setAction(async function (args, hre) {
  await hre.run(TASK_CLEAN);
  await hre.run(TASK_COMPILE);
  const fullNames = await hre.artifacts.getAllFullyQualifiedNames();

  let l2Name = "scroll"; // TODO for test
  const buildInfoPath = solFileName.join(hre.config.paths.artifacts, 'build-info');
  const filenames = fs.readdirSync(buildInfoPath);
  // console.log("filenames=", filenames);
  let l2Instructions = l2Support(l2Name);

  var trunkJsons = [];

  for (let i in filenames) {
    let buff = fs.readFileSync("artifacts/build-info/" + filenames[i]);
    let trunkJson = JSON.parse(buff);
    let contracts = trunkJson["output"]["contracts"];
    for (let solFileName in contracts) {
      let sources = trunkJson['input']['sources'];
      let solContent = sources[solFileName]["content"];
      sources[solFileName]["maps"] = [{ begin: 0, end: 0 }];
      let line = 1;
      let begin = 0;
      for (let j = 0; j < solContent.length; j++) {
        let c = solContent[j];
        if (c == "\n") {
          line++;
          sources[solFileName]["maps"].push({ begin: begin, end: j });
          begin = j + 1;
        }
      }
    }
    trunkJsons.push(trunkJson);
  }
  let scanResults = {};

  for (let i in trunkJsons) {
    let contracts = trunkJsons[i]["output"]["contracts"];
    for (let solFileName in contracts) {
      let trunkJson = trunkJsons[i];
      let sources = trunkJson['input']['sources'];
      let solContent = sources[solFileName]["content"];
      sources[solFileName]["maps"] = [{ begin: 0, end: 0 }];

      let contractJson = contracts[solFileName];
      for (let contractName in contractJson) {
        let line = 1;
        let begin = 0;
        for (let j = 0; j < solContent.length; j++) {
          let c = solContent[j];
          if (c == "\n") {
            line++;
            sources[solFileName]["maps"].push({ begin: begin, end: j });
            begin = j + 1;
          }
        }
        let legacyAssembly = contracts[solFileName][contractName]["evm"]["legacyAssembly"];
        scanAsm(legacyAssembly, l2Instructions, trunkJson, scanResults);
      }
    }
  }

  await Promise.all(fullNames.map(async function (fullName) {
    // if (config.only.length && !config.only.some(m => fullName.match(m))) return;
    // if (config.except.length && config.except.some(m => fullName.match(m))) return;
    //console.log('------');
  }));
});
