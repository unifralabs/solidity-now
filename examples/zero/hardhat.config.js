require("@nomicfoundation/hardhat-toolbox");
require("crazynancy")
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
	      version:"0.6.5",
	      settings:st,
	  }
};
