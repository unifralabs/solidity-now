Contracts source codes from: https://etherscan.io/address/0x34a32df38fc511bf002aed9dec1b70e16870317f#code
# Install

```shell
npm install --dev
```

# Run
```shell
npx hardhat compat-check --chain polygon
```
expected output:

```shell
cleaning cache...
compiling...
Compiled 13 Solidity files successfully
checking compatibility of [polygon]...
Warning: opcode [DIFFICULTY], may have difference behaviour with ethereum. 
--> contracts/CouncilOfKingz.sol:199,25
199 |                        block.difficulty,



checking compatibility of [polygon] done
```
