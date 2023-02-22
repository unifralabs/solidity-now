require("@nomiclabs/hardhat-waffle");
require('hardhat-contract-compat-check')

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
var st = {
  "optimizer": {
    "enabled": true,
    "runs": 200
  },
  outputSelection: {
    "*": {
      "": [],
      "*": ["abi", "metadata", "devdoc", "userdoc", "storageLayout", "evm.legacyAssembly", "evm.methodIdentifiers"]
    }
  }
};
module.exports = {
  solidity: {
    compilers: [
      { version: '0.8.18', settings: st },
      { version: '0.8.17', settings: st },
      { version: '0.8.16', settings: st },
      { version: '0.8.15', settings: st },
      { version: '0.8.14', settings: st },
      { version: '0.8.13', settings: st },
      { version: '0.8.12', settings: st },
      { version: '0.8.11', settings: st },
      { version: '0.8.10', settings: st },
      { version: '0.8.9', settings: st },
      { version: '0.8.8', settings: st },
      { version: '0.8.7', settings: st },
      { version: '0.8.6', settings: st },
      { version: '0.8.5', settings: st },
      { version: '0.8.4', settings: st },
      { version: '0.8.3', settings: st },
      { version: '0.8.2', settings: st },
      { version: '0.8.1', settings: st },
      { version: '0.8.0', settings: st },
      { version: '0.7.6', settings: st },
      { version: '0.7.5', settings: st },
      { version: '0.7.4', settings: st },
      { version: '0.7.3', settings: st },
      { version: '0.7.2', settings: st },
      { version: '0.7.1', settings: st },
      { version: '0.7.0', settings: st },
      { version: '0.6.12', settings: st },
      { version: '0.6.11', settings: st },
      { version: '0.6.10', settings: st },
      { version: '0.6.9', settings: st },
      { version: '0.6.8', settings: st },
      { version: '0.6.7', settings: st },
      { version: '0.6.6', settings: st },
      { version: '0.6.5', settings: st },
      { version: '0.6.4', settings: st },
      { version: '0.6.3', settings: st },
      { version: '0.6.2', settings: st },
      { version: '0.6.1', settings: st },
      { version: '0.6.0', settings: st },
      { version: '0.5.17', settings: st },
      { version: '0.5.16', settings: st },
      { version: '0.5.15', settings: st },
      { version: '0.5.14', settings: st },
      { version: '0.5.13', settings: st },
      { version: '0.5.12', settings: st },
      { version: '0.5.11', settings: st },
      { version: '0.5.10', settings: st },
      { version: '0.5.9', settings: st },
      { version: '0.5.8', settings: st },
      { version: '0.5.7', settings: st },
      { version: '0.5.6', settings: st },
      { version: '0.5.5', settings: st },
      { version: '0.5.4', settings: st },
      { version: '0.5.3', settings: st },
      { version: '0.5.2', settings: st },
      { version: '0.5.1', settings: st }
    ],

  }
};
