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
  //  solidity: "0.8.4",
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
      { version: '0.5.1', settings: st },
      { version: '0.5.0', settings: st },
      { version: '0.4.26', settings: st },
      { version: '0.4.25', settings: st },
      { version: '0.4.24', settings: st },
      { version: '0.4.23', settings: st },
      { version: '0.4.22', settings: st },
      { version: '0.4.21', settings: st },
      { version: '0.4.20', settings: st },
      { version: '0.4.19', settings: st },
      { version: '0.4.18', settings: st },
      { version: '0.4.17', settings: st },
      { version: '0.4.16', settings: st },
      { version: '0.4.15', settings: st },
      { version: '0.4.14', settings: st },
      { version: '0.4.13', settings: st },
      { version: '0.4.12', settings: st },
      { version: '0.4.11', settings: st },
      { version: '0.4.10', settings: st },
      { version: '0.4.9', settings: st },
      { version: '0.4.8', settings: st },
      { version: '0.4.7', settings: st },
      { version: '0.4.6', settings: st },
      { version: '0.4.5', settings: st },
      { version: '0.4.4', settings: st },
      { version: '0.4.3', settings: st },
      { version: '0.4.2', settings: st },
      { version: '0.4.1', settings: st },
      { version: '0.4.0', settings: st },
      { version: '0.3.6', settings: st },
      { version: '0.3.5', settings: st },
      { version: '0.3.4', settings: st },
      { version: '0.3.3', settings: st },
      { version: '0.3.2', settings: st },
      { version: '0.3.1', settings: st },
      { version: '0.3.0', settings: st },
      { version: '0.2.2', settings: st },
      { version: '0.2.1', settings: st },
      { version: '0.2.0', settings: st },
      { version: '0.1.7', settings: st },
      { version: '0.1.6', settings: st },
      { version: '0.1.5', settings: st },
      { version: '0.1.4', settings: st },
      { version: '0.1.3', settings: st },
      { version: '0.1.2', settings: st },
    ],

  }
};
