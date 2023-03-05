# Solidity Now: Hardhat Rollup Compatibility Checker for Solidity

![CI status](https://img.shields.io/github/contributors/unifra20/solidity-now)
![CI status](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat)
<a href="https://twitter.com/unifraplatform">
    <img alt="Twitter" src="https://img.shields.io/twitter/url/https/twitter.com/unifraplatform.svg?style=social&label=Follow%20%40unifra">
</a>

Solidity Now is a hardhat plugin which helps you check your contracts compatibility for rollup. Now it supports `scroll`, `polygon`, `optimism` for now. More rollups are WIP.

*The project is still early version, may change frequently in the future.*

# Usage

```
$npx hardhat compat-check --help                                                   
Hardhat version 2.12.7

Usage: hardhat [GLOBAL OPTIONS] compat-check [--chain <STRING>]

OPTIONS:

  --chain       target chain(supported: scroll, polygon, optimism) (default: "scroll")

compat-check: check rollup compatibility of compiled contracts

For global options help run: hardhat help
```

# quick start
For example, you have writen some contracts trying to deploy them to scroll.Before you do that, 
you can check your contracts by using:

```
npx hardhat compat-check --chain scroll
```




