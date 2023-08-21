# Solidity Now: Hardhat Rollup Compatibility Checker for Solidity

[//]: # (![CI status]&#40;https://img.shields.io/github/contributors/unifra20/solidity-now&#41;)
![CI status](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)
<a href="https://twitter.com/unifraplatform">
    <img alt="Twitter" src="https://img.shields.io/twitter/url/https/twitter.com/unifraplatform.svg?style=social&label=Follow%20%40unifra">
</a>

Solidity Now is a hardhat plugin which helps you check your contracts compatibility for rollup. Now it supports `scroll`, `polygon`, `optimism` for now. More rollups are WIP.

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
npm install --save-dev qiaoxr-kkk

// add following settings under you hardhat compiler config
{"*": ["abi", "metadata", "devdoc", "userdoc", "storageLayout", "evm.legacyAssembly", "evm.methodIdentifiers"]}

// run checking
npx hardhat compat-check --chain scroll
```

## Select rollup
```js
$npx hardhat compat-check --help                                                   
Hardhat version 2.12.7

Usage: hardhat [GLOBAL OPTIONS] compat-check [--chain <STRING>]

OPTIONS:

  --chain       target chain(supported: scroll, polygon, optimism) (default: "scroll")

compat-check: check rollup compatibility of compiled contracts

For global options help run: hardhat help
```

# How it works

[How it works](https://github.com/unifra20/solidity-now/tree/main/how-it-works)



