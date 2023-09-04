# Solidity Now: Hardhat Rollup Compatibility Checker for Solidity

[//]: # (![CI status]&#40;https://img.shields.io/github/contributors/unifra20/solidity-now&#41;)
![CI status](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)
<a href="https://twitter.com/unifraplatform">
    <img alt="Twitter" src="https://img.shields.io/twitter/url/https/twitter.com/unifraplatform.svg?style=social&label=Follow%20%40unifra">
</a>

Solidity Now is a hardhat plugin which helps you check your contracts compatibility for rollup. Now it supports `scroll`, `polygon`, `optimism`,`zksync` for now. More rollups are WIP.

*The project is still early version, may change frequently and be unstable. Welcome for issue for bug report.*

# Quick start (run working demo)

```js
cd /examples/0x
npm i --dev
npx hardhat compat-check --chain scroll
```


# Use in your hardhat workflow

## Basic Usage
For example, you have writen some contracts trying to deploy them to scroll. Before you do deploy,
you can check your contracts by using:

```js
// install this packadge
npm install --save-dev @unifra/hardhat-compat

// add following settings under you hardhat compiler config
{"*": ["abi", "metadata", "devdoc", "userdoc", "storageLayout", "evm.legacyAssembly", "evm.methodIdentifiers"]}

// run checking
npx hardhat compat-check --chain scroll
```

## use it with zksync hardhat plugins
- step 1
  ```
  zksync-cli create demo
  cd demo
  npm install --save-dev @unifra/hardhat-compat
  ```

- step 2
  
  edit `hardhat.config.ts`  add following line:
  ```
  require("@unifra/hardhat-compat");
  ```
- step 3
  
  after done with your contract then run this command:
  ```
  npx hardhat compat-check 
  ```

  output would be like:
  ```
  cleaning cache...
  compiling...
  Compiling contracts for zkSync Era with zksolc v1.3.13 and solc v0.8.17
  Compiling 1 Solidity file
  Successfully compiled 1 Solidity file
  checking compatibility of [zksync]...
  Warning: opcode [CODESIZE], may have difference behaviour with ethereum. 
  --> contracts/Greeter.sol:7,5
  7 |    constructor(string memory _greeting) {
  8 |        greeting = _greeting;
  9 |    }



  Warning: opcode [CODECOPY], may have difference behaviour with ethereum. 
  --> contracts/Greeter.sol:7,5
  7 |    constructor(string memory _greeting) {
  8 |        greeting = _greeting;
  9 |    }



  Warning: opcode [CODECOPY], may have difference behaviour with ethereum. 
  --> contracts/Greeter.sol:4,1
  4 |contract Greeter {
  5 |    string private greeting;
  6 |
  7 |    constructor(string memory _greeting) {
  8 |        greeting = _greeting;
  9 |    }
  10 |
  11 |    function greet() public view returns (string memory) {
  12 |        return greeting;
  13 |    }
  14 |
  15 |    function setGreeting(string memory _greeting) public {
  16 |        greeting = _greeting;
  17 |    }
  18 |}



  checking compatibility of [zksync] done
  ```
  
## Select rollup
```js
$npx hardhat compat-check --help                                                   
Hardhat version 2.12.7

Usage: hardhat [GLOBAL OPTIONS] compat-check [--chain <STRING>]

OPTIONS:

  --chain       target chain(supported: scroll, polygon, optimism, zksync)

compat-check: check rollup compatibility of compiled contracts

For global options help run: hardhat help
```

# How it works

[How it works](https://github.com/unifra20/solidity-now/tree/main/how-it-works)



