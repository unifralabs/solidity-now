const fs = require('fs');
const path = require('path');
const {HardhatPluginError} = require('hardhat/plugins');
const {
    TASK_COMPILE,
} = require('hardhat/builtin-tasks/task-names');

extendEnvironment((hre) => {
    hre.hi = "Hello, Hardhat!";
});

task(
    'compat-check', 'check rollup compatibility of compiled contracts'
).addFlag(
    'chain', 'target chain(default to: scroll)'
).setAction(async function (args, hre) {
    await hre.run(TASK_COMPILE);
    const fullNames = await hre.artifacts.getAllFullyQualifiedNames();

    await Promise.all(fullNames.map(async function (fullName) {
        // if (config.only.length && !config.only.some(m => fullName.match(m))) return;
        // if (config.except.length && config.except.some(m => fullName.match(m))) return;
        //

        const {deployedBytecode} = await hre.artifacts.readArtifact(fullName);
        console.log(fullName)
        console.log(deployedBytecode)
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

});
