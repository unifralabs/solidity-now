require("@nomicfoundation/hardhat-toolbox");
require('crazynancy')
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
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity:{
	version:"0.8.17",
	settings:st
  }
};
