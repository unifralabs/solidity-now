const fs = require('fs');
const path = require('path');
const { readFileSync } = require('fs');
const { HardhatPluginError } = require('hardhat/plugins');
const {
  TASK_COMPILE,
} = require('hardhat/builtin-tasks/task-names');

extendEnvironment((hre) => {
  hre.hi = "Hello, Hardhat!";
});

var l2Results = {};


function l2Support(l2Name) {
  try {
    const data = readFileSync("./" + l2Name + '.json');
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

function scanAsm(obj, l2Instructions) {
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

        if (opName.substr(0, 4) == "PUSH") {
          opName = 'PUSH';
        }
        if (opName in l2Instructions) {
          let file = '';
          let line = 0;
          let errorMsg = "you are using opcode:" + opName + ",which is not compact with ethereum." + file + ':' + line;
          console.log(errorMsg);
        }
      }
    }
    else {
      scanAsm(obj[key], l2Instructions);
    }
  }
}

task(
  'compat-check', 'check rollup compatibility of compiled contracts'
).addFlag(
  'chain', 'target chain(default to: scroll)'
).setAction(async function (args, hre) {
  
  await hre.run(TASK_COMPILE);
  const fullNames = await hre.artifacts.getAllFullyQualifiedNames();
  // const buildInfo = await hre.artifacts.getAllFullyQualifiedNames

  await Promise.all(fullNames.map(async function (fullName) {
    // if (config.only.length && !config.only.some(m => fullName.match(m))) return;
    // if (config.except.length && config.except.some(m => fullName.match(m))) return;
    //

    const { deployedBytecode } = await hre.artifacts.readArtifact(fullName);
    const { _format } = await hre.artifacts.readArtifact(fullName);
    console.log("fullName=", fullName)
    console.log('_format=', _format)
    console.log("deployedBytecode=", deployedBytecode)
    console.log("args=", args)

    //TODO please give l2Name and asm correct value
    let l2Name = "";
    let asm = {};
    let l2Instructions = l2Support(l2Name);
    if (l2Instructions == null) {
      console.log("Did not support [" + l2Name + "] yet!");
      return;
    } else {
      scanAsm(asm, l2Instructions);
    }

    console.log('------')
    // const size = Buffer.from(
    //     deployedBytecode.replace(/__\$\w*\$__/g, '0'.repeat(40)).slice(2),
    //     'hex'
    // ).length;
    //
    // outputData.push({
    //     fullName,
    //     displayName: config.disambiguatePaths ? fullName : fullName.split(':').pop(),
    //     size,
    //     previousSize: previousSizes[fullName] || null,
    // });
  }));

  const buildInfoPath = path.join(hre.config.paths.artifacts, 'build-info');
  const filenames = fs.readdirSync(buildInfoPath);
  console.log("filenames=", filenames);


  // //const buildInfos: BuildInfo[] = 
  // await Promise.all(
  //   //filenames.map(async f => JSON.parse(await fs.readFile(path.join(buildInfoPath, f), 'utf8'))),
  //   filenames.map()
  // );

  // const matching = buildInfos.filter(i => i.solcVersion.startsWith(version));


});
