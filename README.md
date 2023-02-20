# solnow

solnow is a hardhat plugin which helps you check your layer2 contract is compatible with ethereum mainnet or not. We support `scroll`, `polygon`, `optimism` for now, more layer2 is incoming...

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

```
FIXME
```



