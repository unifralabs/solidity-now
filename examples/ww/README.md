Contracts source codes from https://etherscan.io/address/0x495c23b4660f2af9dcc34cf2eaed4b3b54cb9233#code

# Install
```shell
npm install --dev
```

# Run

```shell
npx hardhat compat-check --chain optimism
```
expected output:
```shell
cleaning cache...
compiling...
Compiled 1 Solidity file successfully
checking compatibility of [optimism]...
Warning: opcode [CALLER], may have difference behaviour with ethereum. https://community.optimism.io/docs/developers/build/differences/#bedrock
--> contracts/defaultMain.sol:22,16
22 |        return msg.sender;



Warning: opcode [CALLER], may have difference behaviour with ethereum. https://community.optimism.io/docs/developers/build/differences/#bedrock
--> contracts/defaultMain.sol:998,15
998 |        _mint(msg.sender, totalSupply);



Warning: opcode [ORIGIN], may have difference behaviour with ethereum. https://community.optimism.io/docs/developers/build/differences/#bedrock
--> contracts/defaultMain.sol:1129,62
1129 |                        require(_holderLastTransferTimestamp[tx.origin] < block.number, "_transfer:: Transfer Delay enabled.  Only one purchase per block allowed.");



Warning: opcode [ORIGIN], may have difference behaviour with ethereum. https://community.optimism.io/docs/developers/build/differences/#bedrock
--> contracts/defaultMain.sol:1130,54
1130 |                        _holderLastTransferTimestamp[tx.origin] = block.number;



checking compatibility of [optimism] done
```
