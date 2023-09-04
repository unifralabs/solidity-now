require("@nomicfoundation/hardhat-toolbox");
require("@unifra/hardhat-compat")
/** @type import('hardhat/config').HardhatUserConfig */
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
	      version:"0.8.9",
	      settings:st,
	  }
};
