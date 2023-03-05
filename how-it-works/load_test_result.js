const fs = require('fs');
const path = require('path');
const { argv } = require('process');
const util = require('util')
var opcodes = require("./opcodes.js");
let scrollJson = {
  "stAttackTest/CrashingTransaction": "src/GeneralStateTestsFiller/stAttackTest/CrashingTransactionFiller.json:41 selfdestruct",
  "stBadOpcode/invalidAddr": "src/GeneralStateTestsFiller/stBadOpcode/invalidAddrFiller.yml:323 selfdestruct",
  "stBugs/randomStatetestDEFAULT-Tue_07_58_41-15153-575192": "GeneralStateTests/stBugs/randomStatetestDEFAULT-Tue_07_58_41-15153-575192.json:76 selfdestruct",
  "stBugs/randomStatetestDEFAULT-Tue_07_58_41-15153-575192_london": "GeneralStateTests/stBugs/randomStatetestDEFAULT-Tue_07_58_41-15153-575192_london.json:76 selfdestruct",
  "stCallCreateCallCodeTest/createFailBalanceTooLow": "src/GeneralStateTestsFiller/stCallCreateCallCodeTest/createFailBalanceTooLowFiller.json:45 selfdestruct",
  "stCallCreateCallCodeTest/createInitFailBadJumpDestination": "src/GeneralStateTestsFiller/stCallCreateCallCodeTest/createInitFailBadJumpDestinationFiller.json:28 selfdestruct",
  "stCallCreateCallCodeTest/createInitFailBadJumpDestination2": "src/GeneralStateTestsFiller/stCallCreateCallCodeTest/createInitFailBadJumpDestination2Filler.json:28 selfdestruct",
  "stCallCreateCallCodeTest/createInitFailStackSizeLargerThan1024": "src/GeneralStateTestsFiller/stCallCreateCallCodeTest/createInitFailStackSizeLargerThan1024Filler.json:28 selfdestruct",
  "stCallCreateCallCodeTest/createInitFailStackUnderflow": "src/GeneralStateTestsFiller/stCallCreateCallCodeTest/createInitFailStackUnderflowFiller.json:28 selfdestruct",
  "stCallCreateCallCodeTest/createInitFailUndefinedInstruction2": "src/GeneralStateTestsFiller/stCallCreateCallCodeTest/createInitFailUndefinedInstruction2Filler.json:28 selfdestruct",
  "stCallCreateCallCodeTest/createInitOOGforCREATE": "src/GeneralStateTestsFiller/stCallCreateCallCodeTest/createInitOOGforCREATEFiller.json:40 selfdestruct",
  "stCreate2/create2InitCodes": "src/GeneralStateTestsFiller/stCreate2/create2InitCodesFiller.json:178 selfdestruct",
  "stCreate2/create2SmartInitCode": "src/GeneralStateTestsFiller/stCreate2/create2SmartInitCodeFiller.json:66  selfdestruct",
  "stCreateTest/CreateResults": "src/GeneralStateTestsFiller/stCreateTest/CreateResultsFiller.yml：260 selfdestruct",
  "stEIP150singleCodeGasPrices/eip2929-ff": "src/GeneralStateTestsFiller/stEIP150singleCodeGasPrices/eip2929-ffFiller.yml:100 selfdestruct",
  "stEIP150singleCodeGasPrices/gasCost": "src/GeneralStateTestsFiller/stEIP150singleCodeGasPrices/gasCostFiller.yml:202 selfdestruct",
  "stEIP150singleCodeGasPrices/gasCostBerlin": "src/GeneralStateTestsFiller/stEIP150singleCodeGasPrices/gasCostBerlinFiller.yml:201 selfdestruct",
  "stEIP1559/baseFeeDiffPlaces": "src/GeneralStateTestsFiller/stEIP1559/baseFeeDiffPlacesFiller.yml:228 selfdestruct",
  "stEIP1559/gasPriceDiffPlaces": "src/GeneralStateTestsFiller/stEIP1559/gasPriceDiffPlacesFiller.yml:606 selfdestruct",
  "stExample/accessListExample": "TR_TypeNotSupported",
  "stExample/basefeeExample": "TR_TypeNotSupported",
  "stExample/eip1559": "TR_TypeNotSupported",
  "stExample/mergeTest": "stExample/mergeTest Difficulty",
  "stExtCodeHash/extcodehashEmpty": "src/GeneralStateTestsFiller/stExtCodeHash/extcodehashEmptyFiller.yml:228 selfdestruct",
  "stRandom/randomStatetest100": "Difficulty",
  "stRandom/randomStatetest138": "Difficulty",
  "stRandom/randomStatetest139": "Difficulty",
  "stRandom/randomStatetest14": "Difficulty",
  "stRandom/randomStatetest146": "Difficulty",
  "stRandom/randomStatetest147": "Difficulty",
  "stRandom/randomStatetest153": "Difficulty",
  "stRandom/randomStatetest173": "Difficulty",
  "stRandom/randomStatetest198": "Difficulty",
  "stRandom/randomStatetest201": "Difficulty",
  "stRandom/randomStatetest212": "Difficulty",
  "stRandom/randomStatetest22": "Difficulty",
  "stRandom/randomStatetest232": "Difficulty",
  "stRandom/randomStatetest246": "Difficulty",
  "stRandom/randomStatetest26": "Difficulty",
  "stRandom/randomStatetest273": "Difficulty",
  "stRandom/randomStatetest282": "Difficulty",
  "stRandom/randomStatetest287": "Difficulty",
  "stRandom/randomStatetest303": "Difficulty",
  "stRandom/randomStatetest36": "Difficulty",
  "stRandom/randomStatetest367": "Difficulty",
  "stRandom/randomStatetest376": "Difficulty",
  "stRandom2/randomStatetest401": "Difficulty",
  "stRandom2/randomStatetest409": "Difficulty",
  "stRandom2/randomStatetest417": "Difficulty",
  "stRandom2/randomStatetest466": "Difficulty",
  "stRandom2/randomStatetest476": "Difficulty",
  "stRandom2/randomStatetest487": "Difficulty",
  "stRandom2/randomStatetest495": "Difficulty",
  "stRandom2/randomStatetest559": "Difficulty",
  "stRandom2/randomStatetest577": "Difficulty",
  "stRandom2/randomStatetest581": "Difficulty",
  "stRandom2/randomStatetest627": "Difficulty",
  "stRandom2/randomStatetest632": "Difficulty",
  "stRandom2/randomStatetest635": "Difficulty",
  "stRefundTest/refundFF": "src/GeneralStateTestsFiller/stRefundTest/refundFFFiller.yml:25 selfdestruct",
  "stRevertTest/TouchToEmptyAccountRevert3": "src/GeneralStateTestsFiller/stRevertTest/TouchToEmptyAccountRevert3Filler.json:59 selfdestruct",
  "stSelfBalance/diffPlaces": "src/GeneralStateTestsFiller/stSelfBalance/diffPlacesFiller.yml:606 selfdestruct",
  "stSpecialTest/eoaEmpty": "src/GeneralStateTestsFiller/stSpecialTest/eoaEmptyFiller.yml:130 selfdestruct",
  "stSystemOperationsTest/extcodecopy": "src/GeneralStateTestsFiller/stSystemOperationsTest/extcodecopyFiller.json:66 block.difficulty",
  "stWalletTest/walletKill": "src/GeneralStateTestsFiller/stWalletTest/walletKillFiller.json:41 selfdestruct",
  "stWalletTest/walletKillToWallet": "src/GeneralStateTestsFiller/stWalletTest/walletKillToWalletFiller.json:41 selfdestruct",
  "stTransactionTest/Opcodes_TransactionInit": "tests/src/GeneralStateTestsFiller/stTransactionTest/Opcodes_TransactionInitFiller.json:413 selfdestruct",
};

var totalCount = 0;
var totalPass = 0;
var totalFail = 0;
var totalKnown = 0;

function LoadTestOutput(rootPath, version) {
  let rootJson = {
    cases: [],
    opcases: {}
  }
  iteratDir(rootPath);
  // console.log(rootPath);
  function iteratDir(rootDir) {
    let pa = fs.readdirSync(rootDir);
    pa.forEach(function (ele, index) {
      let filename = rootDir + "/" + ele;
      let info = fs.statSync(filename);
      if (info.isDirectory()) {
        iteratDir(filename);
      } else {
        AnalizeTestResult(filename, rootJson, rootPath);
      }
    });
  }

  // content = JSON.stringify(root);
  outFile = rootPath + "/resultData.json";
  fs.writeFileSync(outFile, JSON.stringify(rootJson))
}

function AnalizeTestResult(filename, rootJson, rootPath) {

  data = fs.readFileSync(filename)
  var Case = {
    folder: "",
    forks: {},
    fail: 0,
    total: 0,
    known: 0,
    pass: 0,
    raw: "",
    opcases: {}
  };
  Case.raw = data.toString();
  let dirname = path.dirname(filename);
  let arrPath = dirname.split('/');
  Case.folder = arrPath[arrPath.length - 1];

  //Total Tests Run: (.*?)\n
  reg = new RegExp("Total Tests Run: (.*?)\n");
  let arr = reg.exec(Case.raw);
  if (arr == null) {
    console.log(filename, "not complete");
    return;
  }
  if (arr.length > 0) {
    Case.total = parseInt(arr[arr.length - 1], 10);
    totalCount += Case.total;
  }

  // reg = new RegExp("Test Case \"(.*?)\":");
  // var arrName = reg.exec(Case.raw);
  // if (arrName == null) {
  //   console.error(filename, "not Test Case?");
  //   return;
  // }
  // if (arrName.length > 0) {
  //   Case.folder = arrName[arrName.length - 1];
  // }


  arr = Case.raw.match(/info:(.*?)\n/g);
  if (arr == null) {
    Case.fail = 0;
    Case.pass = Case.total;
    totalPass += Case.pass;
    let cov = 100;
    let percent = cov.toFixed(2) + '%';
    console.log("|", Case.folder, "|", Case.total, "|", Case.pass, '|', Case.fail - Case.known, '|', Case.known, '|', percent);
    return;
  }
  Case.fail = arr.length;
  totalFail += Case.fail;
  Case.pass = Case.total - Case.fail;
  totalPass += Case.pass;

  forkname = "";
  let msgKnownFail = "";

  for (i = 0; i < arr.length; i++) {
    var failCase = {
      casename: "",
      info: "",
      reason: ""
    };
    line = arr[i];
    regInBrace = new RegExp("\\((.*?)\\)");
    arr1 = regInBrace.exec(line);
    failCase.info = line;
    for (j = 1; j < arr1.length; j++) {
      var arr2 = arr1[j].split(",");
      failCase.casename = arr2[0].trim();
      var pair = arr2[1].split(':');
      if (j == 1) {
        forkname = pair[1].trim();
      }
    }
    if (rootPath.indexOf('scroll') >= 0) {
      let lowerCase = line.toLowerCase();
      if (lowerCase.indexOf('suicide') >= 0 || lowerCase.indexOf("selfdestruct") >= 0 || lowerCase.indexOf('deletedaccount') >= 0) {
        failCase.reason = "selfdestruct";
        Case.known++;
        totalKnown++;

        failReasonTable += util.format("\n|%s|%s|", failCase.casename, failCase.reason);
      }
      else if (failCase.casename in scrollJson) {
        Case.known++;
        totalKnown++;
        failCase.reason = scrollJson[failCase.casename];
        failReasonTable += util.format("\n|%s|%s|", failCase.casename, failCase.reason);
      }
    }

    // console.log("filename", filename);
    if (true || (filename.search("VMTests") >= 0)) {
      var arrCaseName = failCase.casename.split("/");
      var insName = arrCaseName[arrCaseName.length - 1];
      insName = insName.toLowerCase()
      for (k in opcodes.Name2op) {
        var opname = k.toLowerCase();

        if (insName == opname) {
          if (!rootJson.opcases.hasOwnProperty(opname)) {
            rootJson.opcases[opname] = {};
          }
          rootJson.opcases[opname][forkname] = failCase.casename;
        }
      }
    }
    if (!Case.forks.hasOwnProperty(forkname)) {
      Case.forks[forkname] = [];
    }
    Case.forks[forkname].push(failCase);
  }

  let cov = 100 * Case.pass / Case.total;
  let percent = cov.toFixed(2) + '%';
  console.log("|", Case.folder, "|", Case.total, "|", Case.pass, '|', Case.fail, '|', Case.known, '|', percent);
  rootJson.cases.push(Case);
}
module.exports = { LoadTestOutput }

var failReasonTable = '|fail case| reason |\n|:---:|:---:|';
LoadTestOutput(process.argv[2], "1.0")

console.log('|total|', totalCount, '|', totalPass, '|', totalFail, '|', totalKnown, '|', (100 * totalPass / totalCount).toFixed(2) + "%")

console.log(failReasonTable);
