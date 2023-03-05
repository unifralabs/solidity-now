Contracts source codes from https://etherscan.io/address/0xdef1c0ded9bec7f1a1670819833240f027b25eff#code

# Install
```shell
npm install --dev
```

#Run

```shell
npx hardhat compat-check --chain scroll
```
expected output:
```shell
cleaning cache...
compiling...
Compiled 80 Solidity files successfully
checking compatibility of [scroll]...
error: opcode [SELFDESTRUCT] not supported.
--> contracts/zero-ex/contracts/src/features/Bootstrap.sol:83,9
83 |        selfdestruct(msg.sender);



error: opcode [SELFDESTRUCT] not supported.
--> contracts/zero-ex/contracts/src/migrations/FullMigration.sol:109,9
109 |        selfdestruct(ethRecipient);



error: opcode [SELFDESTRUCT] not supported.
--> contracts/zero-ex/contracts/src/migrations/InitialMigration.sol:125,9
125 |        selfdestruct(ethRecipient);



error: opcode [SELFDESTRUCT] not supported.
--> contracts/zero-ex/contracts/src/transformers/Transformer.sol:63,9
63 |        selfdestruct(ethRecipient);



error: opcode [SELFDESTRUCT] not supported.
--> contracts/zero-ex/contracts/test/TestTransformerDeployerTransformer.sol:42,9
42 |        selfdestruct(deployer);
```
