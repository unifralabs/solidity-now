# How It Works?

*NOTICE: The doc is still WIP🚧🚧.*

*NOTICE: The purpose of this report is to introduce how  `Solidity Now` works. Due to the limitations of our testing
methods and knowledge, it may contain some misleading or error information. If you have any suggestions or opinions,
please kindly report them in the issue section.*

To figure out the opcodes `solidity-now` should give warnings, we use [retesteth](https://github.com/ethereum/retesteth)
with ethereum [official test vectors](https://github.com/ethereum/retesteth) on different rollups. The repos and version
we used are listed as followed:

- retesteth : <https://github.com/ethereum/retesteth>
  `retesteth-0.2.3-postmerge+commit.c5274b17.Darwin.appleclang`
- tests: <https://github.com/ethereum/tests>
  `tag: v11.3`
- opcodes: <https://www.evm.codes/?fork=merge>

These cases covered most of the [evm opcodes](https://github.com/unifra20/layer2Test/blob/main/opcodes.js). 136 opcodes
tested and there are 143 in total, basically coverage=95%.

## Preparatory work

### build `retesteth`

Following this document <https://github.com/ethereum/retesteth>, we build retesteth then copy retesteth to
/usr/local/bin

```shell
cp ./retesteth/build/retesteth/retesteth /usr/local/bin/retesteth
```

## Scroll

### Step 1: build 

We fork repository from <https://github.com/scroll-tech/go-ethereum.git> based on `prealpha-v5.1`.
We make the following changes to execution the testing:

- modify `t8ntool` to enable BaseFee
- modify to support the fork 'Merged'
- change `CODEHASH` algorithm from poseidon to Keccak256. (`Scroll team also have done this in the latest branch.`)

For more detail modification we made, see <https://github.com/unifra20/go-ethereum/tree/for_retesteth>

Run following script to build the testing target

```shell
git clone https://github.com/unifra20/go-ethereum.git
cd go-ethereum
git checkout for_retesteth
make all
cd ..
```

### Step 2: run

```shell
sh ./runtest.sh scroll ./go-ethereum/build/bin/evm
```

We build a table show the result.

- folder: folder name
- total: total case count
- pass: pass case count
- total failed: failed case count
- failed with known cause: failed and known reason
- pass rate: pass/total

folder|total|pass|total fail|fail with known cause|pass rate
|--|--|--|--|--|--|
| EIPTests | 6 | 6 | 0 | 0 | 100.00%
| VMTests | 62 | 60 | 2 | 1 | 96.77%
| stArgsZeroOneBalance | 45 | 44 | 1 | 1 | 97.78%
| stAttackTest | 1 | 0 | 1 | 1 | 0.00%
| stBadOpcode | 120 | 119 | 1 | 1 | 99.17%
| stBugs | 3 | 1 | 2 | 2 | 33.33%
| stCallCodes | 60 | 40 | 20 | 20 | 66.67%
| stCallCreateCallCodeTest | 36 | 29 | 7 | 7 | 80.56%
| stCallDelegateCodesCallCodeHomestead | 41 | 24 | 17 | 17 | 58.54%
| stCallDelegateCodesHomestead | 41 | 24 | 17 | 17 | 58.54%
| stChainId | 2 | 2 | 0 | 0 | 100.00%
| stCodeCopyTest | 2 | 2 | 0 | 0 | 100.00%
| stCodeSizeLimit | 5 | 5 | 0 | 0 | 100.00%
| stCreate2 | 43 | 35 | 8 | 8 | 81.40%
| stCreateTest | 34 | 25 | 9 | 9 | 73.53%
| stDelegatecallTestHomestead | 28 | 28 | 0 | 0 | 100.00%
| stEIP150Specific | 12 | 10 | 2 | 2 | 83.33%
| stEIP150singleCodeGasPrices | 37 | 34 | 3 | 3 | 91.89%
| stEIP1559 | 11 | 9 | 2 | 2 | 81.82%
| stEIP158Specific | 4 | 1 | 3 | 2 | 25.00%
| stEIP2930 | 6 | 5 | 1 | 1 | 83.33%
| stEIP3607 | 5 | 5 | 0 | 0 | 100.00%
| stExample | 8 | 4 | 4 | 4 | 50.00%
| stExtCodeHash | 21 | 10 | 11 | 11 | 47.62%
| stHomesteadSpecific | 5 | 5 | 0 | 0 | 100.00%
| stInitCodeTest | 16 | 15 | 1 | 1 | 93.75%
| stLogTests | 46 | 46 | 0 | 0 | 100.00%
| stMemExpandingEIP150Calls | 9 | 9 | 0 | 0 | 100.00%
| stMemoryStressTest | 38 | 38 | 0 | 0 | 100.00%
| stMemoryTest | 71 | 71 | 0 | 0 | 100.00%
| stNonZeroCallsTest | 20 | 16 | 4 | 4 | 80.00%
| stQuadraticComplexityTest | 16 | 16 | 0 | 0 | 100.00%
| stRandom | 292 | 270 | 22 | 22 | 92.47%
| stRandom2 | 212 | 199 | 13 | 13 | 93.87%
| stRecursiveCreate | 2 | 2 | 0 | 0 | 100.00%
| stRefundTest | 15 | 7 | 8 | 8 | 46.67%
| stReturnDataTest | 41 | 41 | 0 | 0 | 100.00%
| stRevertTest | 45 | 44 | 1 | 1 | 97.78%
| stSLoadTest | 1 | 1 | 0 | 0 | 100.00%
| stSStoreTest | 28 | 28 | 0 | 0 | 100.00%
| stSelfBalance | 5 | 4 | 1 | 1 | 80.00%
| stShift | 42 | 42 | 0 | 0 | 100.00%
| stSolidityTest | 16 | 14 | 2 | 2 | 87.50%
| stSpecialTest | 13 | 11 | 2 | 2 | 84.62%
| stStackTests | 10 | 10 | 0 | 0 | 100.00%
| stStaticCall | 275 | 264 | 11 | 11 | 96.00%
| stStaticFlagEnabled | 13 | 13 | 0 | 0 | 100.00%
| stSystemOperationsTest | 54 | 41 | 13 | 13 | 75.93%
| stTimeConsuming | 14 | 14 | 0 | 0 | 100.00%
| stTransactionTest | 23 | 15 | 8 | 6 | 65.22%
| stTransitionTest | 6 | 6 | 0 | 0 | 100.00%
| stWalletTest | 40 | 38 | 2 | 2 | 95.00%
| stZeroCallsRevert | 16 | 16 | 0 | 0 | 100.00%
| stZeroCallsTest | 20 | 16 | 4 | 4 | 80.00%
| stZeroKnowledge | 133 | 133 | 0 | 0 | 100.00%
| stZeroKnowledge2 | 130 | 130 | 0 | 0 | 100.00%
|total| 2300 | 2097 | 203 | 199 | 91.17%

### Fail Cause

|fail case| cause |
|---|--|
|vmTests/suicide|selfdestruct|
|stArgsZeroOneBalance/suicideNonConst|selfdestruct|
|stAttackTest/CrashingTransaction|src/GeneralStateTestsFiller/stAttackTest/CrashingTransactionFiller.json:41
selfdestruct|
|stBadOpcode/invalidAddr|src/GeneralStateTestsFiller/stBadOpcode/invalidAddrFiller.yml:323 selfdestruct|
|stBugs/randomStatetestDEFAULT-Tue_07_58_41-15153-575192|GeneralStateTests/stBugs/randomStatetestDEFAULT-Tue_07_58_41-15153-575192.json:
76 selfdestruct|
|stBugs/randomStatetestDEFAULT-Tue_07_58_41-15153-575192_london|GeneralStateTests/stBugs/randomStatetestDEFAULT-Tue_07_58_41-15153-575192_london.json:
76 selfdestruct|
|stCallCodes/callcall_00_SuicideEnd|selfdestruct|
|stCallCodes/callcallcall_000_SuicideEnd|selfdestruct|
|stCallCodes/callcallcall_000_SuicideMiddle|selfdestruct|
|stCallCodes/callcallcallcode_001_SuicideEnd|selfdestruct|
|stCallCodes/callcallcallcode_001_SuicideMiddle|selfdestruct|
|stCallCodes/callcallcode_01_SuicideEnd|selfdestruct|
|stCallCodes/callcallcodecall_010_SuicideEnd|selfdestruct|
|stCallCodes/callcallcodecall_010_SuicideMiddle|selfdestruct|
|stCallCodes/callcallcodecallcode_011_SuicideEnd|selfdestruct|
|stCallCodes/callcallcodecallcode_011_SuicideMiddle|selfdestruct|
|stCallCodes/callcodecall_10_SuicideEnd|selfdestruct|
|stCallCodes/callcodecallcall_100_SuicideEnd|selfdestruct|
|stCallCodes/callcodecallcall_100_SuicideMiddle|selfdestruct|
|stCallCodes/callcodecallcallcode_101_SuicideEnd|selfdestruct|
|stCallCodes/callcodecallcallcode_101_SuicideMiddle|selfdestruct|
|stCallCodes/callcodecallcode_11_SuicideEnd|selfdestruct|
|stCallCodes/callcodecallcodecall_110_SuicideEnd|selfdestruct|
|stCallCodes/callcodecallcodecall_110_SuicideMiddle|selfdestruct|
|stCallCodes/callcodecallcodecallcode_111_SuicideEnd|selfdestruct|
|stCallCodes/callcodecallcodecallcode_111_SuicideMiddle|selfdestruct|
|stCallCreateCallCodeTest/createFailBalanceTooLow|src/GeneralStateTestsFiller/stCallCreateCallCodeTest/createFailBalanceTooLowFiller.json:
45 selfdestruct|
|stCallCreateCallCodeTest/createInitFailBadJumpDestination|src/GeneralStateTestsFiller/stCallCreateCallCodeTest/createInitFailBadJumpDestinationFiller.json:
28 selfdestruct|
|stCallCreateCallCodeTest/createInitFailBadJumpDestination2|src/GeneralStateTestsFiller/stCallCreateCallCodeTest/createInitFailBadJumpDestination2Filler.json:
28 selfdestruct|
|stCallCreateCallCodeTest/createInitFailStackSizeLargerThan1024|src/GeneralStateTestsFiller/stCallCreateCallCodeTest/createInitFailStackSizeLargerThan1024Filler.json:
28 selfdestruct|
|stCallCreateCallCodeTest/createInitFailStackUnderflow|src/GeneralStateTestsFiller/stCallCreateCallCodeTest/createInitFailStackUnderflowFiller.json:
28 selfdestruct|
|stCallCreateCallCodeTest/createInitFailUndefinedInstruction2|src/GeneralStateTestsFiller/stCallCreateCallCodeTest/createInitFailUndefinedInstruction2Filler.json:
28 selfdestruct|
|stCallCreateCallCodeTest/createInitOOGforCREATE|src/GeneralStateTestsFiller/stCallCreateCallCodeTest/createInitOOGforCREATEFiller.json:
40 selfdestruct|
|stCallDelegateCodesCallCodeHomestead/callcallcallcode_001_SuicideEnd|selfdestruct|
|stCallDelegateCodesCallCodeHomestead/callcallcallcode_001_SuicideMiddle|selfdestruct|
|stCallDelegateCodesCallCodeHomestead/callcallcode_01_SuicideEnd|selfdestruct|
|stCallDelegateCodesCallCodeHomestead/callcallcodecall_010_SuicideEnd|selfdestruct|
|stCallDelegateCodesCallCodeHomestead/callcallcodecall_010_SuicideMiddle|selfdestruct|
|stCallDelegateCodesCallCodeHomestead/callcallcodecallcode_011_SuicideEnd|selfdestruct|
|stCallDelegateCodesCallCodeHomestead/callcallcodecallcode_011_SuicideMiddle|selfdestruct|
|stCallDelegateCodesCallCodeHomestead/callcodecall_10_SuicideEnd|selfdestruct|
|stCallDelegateCodesCallCodeHomestead/callcodecallcall_100_SuicideEnd|selfdestruct|
|stCallDelegateCodesCallCodeHomestead/callcodecallcall_100_SuicideMiddle|selfdestruct|
|stCallDelegateCodesCallCodeHomestead/callcodecallcallcode_101_SuicideEnd|selfdestruct|
|stCallDelegateCodesCallCodeHomestead/callcodecallcallcode_101_SuicideMiddle|selfdestruct|
|stCallDelegateCodesCallCodeHomestead/callcodecallcode_11_SuicideEnd|selfdestruct|
|stCallDelegateCodesCallCodeHomestead/callcodecallcodecall_110_SuicideEnd|selfdestruct|
|stCallDelegateCodesCallCodeHomestead/callcodecallcodecall_110_SuicideMiddle|selfdestruct|
|stCallDelegateCodesCallCodeHomestead/callcodecallcodecallcode_111_SuicideEnd|selfdestruct|
|stCallDelegateCodesCallCodeHomestead/callcodecallcodecallcode_111_SuicideMiddle|selfdestruct|
|stCallDelegateCodesHomestead/callcallcallcode_001_SuicideEnd|selfdestruct|
|stCallDelegateCodesHomestead/callcallcallcode_001_SuicideMiddle|selfdestruct|
|stCallDelegateCodesHomestead/callcallcode_01_SuicideEnd|selfdestruct|
|stCallDelegateCodesHomestead/callcallcodecall_010_SuicideEnd|selfdestruct|
|stCallDelegateCodesHomestead/callcallcodecall_010_SuicideMiddle|selfdestruct|
|stCallDelegateCodesHomestead/callcallcodecallcode_011_SuicideEnd|selfdestruct|
|stCallDelegateCodesHomestead/callcallcodecallcode_011_SuicideMiddle|selfdestruct|
|stCallDelegateCodesHomestead/callcodecall_10_SuicideEnd|selfdestruct|
|stCallDelegateCodesHomestead/callcodecallcall_100_SuicideEnd|selfdestruct|
|stCallDelegateCodesHomestead/callcodecallcall_100_SuicideMiddle|selfdestruct|
|stCallDelegateCodesHomestead/callcodecallcallcode_101_SuicideEnd|selfdestruct|
|stCallDelegateCodesHomestead/callcodecallcallcode_101_SuicideMiddle|selfdestruct|
|stCallDelegateCodesHomestead/callcodecallcode_11_SuicideEnd|selfdestruct|
|stCallDelegateCodesHomestead/callcodecallcodecall_110_SuicideEnd|selfdestruct|
|stCallDelegateCodesHomestead/callcodecallcodecall_110_SuicideMiddle|selfdestruct|
|stCallDelegateCodesHomestead/callcodecallcodecallcode_111_SuicideEnd|selfdestruct|
|stCallDelegateCodesHomestead/callcodecallcodecallcode_111_SuicideMiddle|selfdestruct|
|stCreate2/CREATE2_ContractSuicideDuringInit_ThenStoreThenReturn|selfdestruct|
|stCreate2/CREATE2_Suicide|selfdestruct|
|stCreate2/Create2OOGFromCallRefunds|selfdestruct|
|stCreate2/create2InitCodes|src/GeneralStateTestsFiller/stCreate2/create2InitCodesFiller.json:178 selfdestruct|
|stCreate2/create2SmartInitCode|src/GeneralStateTestsFiller/stCreate2/create2SmartInitCodeFiller.json:66 selfdestruct|
|stCreate2/create2collisionSelfdestructed|selfdestruct|
|stCreate2/create2collisionSelfdestructed2|selfdestruct|
|stCreate2/create2collisionSelfdestructedRevert|selfdestruct|
|stCreateTest/CREATE_AcreateB_BSuicide_BStore|selfdestruct|
|stCreateTest/CREATE_ContractSuicideDuringInit|selfdestruct|
|stCreateTest/CREATE_ContractSuicideDuringInit_ThenStoreThenReturn|selfdestruct|
|stCreateTest/CREATE_ContractSuicideDuringInit_WithValue|selfdestruct|
|stCreateTest/CREATE_ContractSuicideDuringInit_WithValueToItself|selfdestruct|
|stCreateTest/CreateOOGFromCallRefunds|selfdestruct|
|stCreateTest/CreateOOGFromEOARefunds|selfdestruct|
|stCreateTest/CreateOOGafterMaxCodesize|selfdestruct|
|stCreateTest/CreateResults|src/GeneralStateTestsFiller/stCreateTest/CreateResultsFiller.yml：260 selfdestruct|
|stEIP150Specific/SuicideToExistingContract|selfdestruct|
|stEIP150Specific/SuicideToNotExistingContract|selfdestruct|
|stEIP150singleCodeGasPrices/eip2929-ff|src/GeneralStateTestsFiller/stEIP150singleCodeGasPrices/eip2929-ffFiller.yml:100
selfdestruct|
|stEIP150singleCodeGasPrices/gasCost|src/GeneralStateTestsFiller/stEIP150singleCodeGasPrices/gasCostFiller.yml:202
selfdestruct|
|stEIP150singleCodeGasPrices/gasCostBerlin|src/GeneralStateTestsFiller/stEIP150singleCodeGasPrices/gasCostBerlinFiller.yml:
201 selfdestruct|
|stEIP1559/baseFeeDiffPlaces|src/GeneralStateTestsFiller/stEIP1559/baseFeeDiffPlacesFiller.yml:228 selfdestruct|
|stEIP1559/gasPriceDiffPlaces|src/GeneralStateTestsFiller/stEIP1559/gasPriceDiffPlacesFiller.yml:606 selfdestruct|
|stEIP158Specific/CALL_OneVCallSuicide|selfdestruct|
|stEIP158Specific/CALL_ZeroVCallSuicide|selfdestruct|
|stEIP2930/variedContext|selfdestruct|
|stExample/accessListExample|TR_TypeNotSupported|
|stExample/basefeeExample|TR_TypeNotSupported|
|stExample/eip1559|TR_TypeNotSupported|
|stExample/mergeTest|stExample/mergeTest Difficulty|
|stExtCodeHash/callToSuicideThenExtcodehash|selfdestruct|
|stExtCodeHash/extCodeHashCreatedAndDeletedAccount|selfdestruct|
|stExtCodeHash/extCodeHashCreatedAndDeletedAccountCall|selfdestruct|
|stExtCodeHash/extCodeHashCreatedAndDeletedAccountRecheckInOuterCall|selfdestruct|
|stExtCodeHash/extCodeHashDeletedAccount|selfdestruct|
|stExtCodeHash/extCodeHashDeletedAccount1|selfdestruct|
|stExtCodeHash/extCodeHashDeletedAccount2|selfdestruct|
|stExtCodeHash/extCodeHashDeletedAccount3|selfdestruct|
|stExtCodeHash/extCodeHashDeletedAccount4|selfdestruct|
|stExtCodeHash/extCodeHashSubcallSuicide|selfdestruct|
|stExtCodeHash/extcodehashEmpty|src/GeneralStateTestsFiller/stExtCodeHash/extcodehashEmptyFiller.yml:228 selfdestruct|
|stInitCodeTest/TransactionCreateSuicideInInitcode|selfdestruct|
|stNonZeroCallsTest/NonZeroValue_SUICIDE|selfdestruct|
|stNonZeroCallsTest/NonZeroValue_SUICIDE_ToEmpty|selfdestruct|
|stNonZeroCallsTest/NonZeroValue_SUICIDE_ToNonNonZeroBalance|selfdestruct|
|stNonZeroCallsTest/NonZeroValue_SUICIDE_ToOneStorageKey|selfdestruct|
|stRandom/randomStatetest100|Difficulty|
|stRandom/randomStatetest138|Difficulty|
|stRandom/randomStatetest139|Difficulty|
|stRandom/randomStatetest14|Difficulty|
|stRandom/randomStatetest146|Difficulty|
|stRandom/randomStatetest147|Difficulty|
|stRandom/randomStatetest153|Difficulty|
|stRandom/randomStatetest173|Difficulty|
|stRandom/randomStatetest198|Difficulty|
|stRandom/randomStatetest201|Difficulty|
|stRandom/randomStatetest212|Difficulty|
|stRandom/randomStatetest22|Difficulty|
|stRandom/randomStatetest232|Difficulty|
|stRandom/randomStatetest246|Difficulty|
|stRandom/randomStatetest26|Difficulty|
|stRandom/randomStatetest273|Difficulty|
|stRandom/randomStatetest282|Difficulty|
|stRandom/randomStatetest287|Difficulty|
|stRandom/randomStatetest303|Difficulty|
|stRandom/randomStatetest36|Difficulty|
|stRandom/randomStatetest367|Difficulty|
|stRandom/randomStatetest376|Difficulty|
|stRandom2/randomStatetest401|Difficulty|
|stRandom2/randomStatetest409|Difficulty|
|stRandom2/randomStatetest417|Difficulty|
|stRandom2/randomStatetest466|Difficulty|
|stRandom2/randomStatetest476|Difficulty|
|stRandom2/randomStatetest487|Difficulty|
|stRandom2/randomStatetest495|Difficulty|
|stRandom2/randomStatetest559|Difficulty|
|stRandom2/randomStatetest577|Difficulty|
|stRandom2/randomStatetest581|Difficulty|
|stRandom2/randomStatetest627|Difficulty|
|stRandom2/randomStatetest632|Difficulty|
|stRandom2/randomStatetest635|Difficulty|
|stRefundTest/refundFF|src/GeneralStateTestsFiller/stRefundTest/refundFFFiller.yml:25 selfdestruct|
|stRefundTest/refundSuicide50procentCap|selfdestruct|
|stRefundTest/refund_CallToSuicideNoStorage|selfdestruct|
|stRefundTest/refund_CallToSuicideStorage|selfdestruct|
|stRefundTest/refund_CallToSuicideTwice|selfdestruct|
|stRefundTest/refund_TxToSuicide|selfdestruct|
|stRefundTest/refund_multimpleSuicide|selfdestruct|
|stRefundTest/refund_singleSuicide|selfdestruct|
|stRevertTest/TouchToEmptyAccountRevert3|src/GeneralStateTestsFiller/stRevertTest/TouchToEmptyAccountRevert3Filler.json:
59 selfdestruct|
|stSelfBalance/diffPlaces|src/GeneralStateTestsFiller/stSelfBalance/diffPlacesFiller.yml:606 selfdestruct|
|stSolidityTest/SelfDestruct|selfdestruct|
|stSolidityTest/TestContractSuicide|selfdestruct|
|stSpecialTest/eoaEmpty|src/GeneralStateTestsFiller/stSpecialTest/eoaEmptyFiller.yml:130 selfdestruct|
|stSpecialTest/selfdestructEIP2929|selfdestruct|
|stStaticCall/static_ABAcallsSuicide0|selfdestruct|
|stStaticCall/static_CREATE_ContractSuicideDuringInit|selfdestruct|
|stStaticCall/static_CREATE_ContractSuicideDuringInit_ThenStoreThenReturn|selfdestruct|
|stStaticCall/static_CREATE_ContractSuicideDuringInit_WithValue|selfdestruct|
|stStaticCall/static_callcodecall_10_SuicideEnd|selfdestruct|
|stStaticCall/static_callcodecall_10_SuicideEnd2|selfdestruct|
|stStaticCall/static_callcodecallcodecall_110_SuicideEnd|selfdestruct|
|stStaticCall/static_callcodecallcodecall_110_SuicideEnd2|selfdestruct|
|stStaticCall/static_callcodecallcodecall_110_SuicideMiddle|selfdestruct|
|stStaticCall/static_callcodecallcodecall_110_SuicideMiddle2|selfdestruct|
|stStaticCall/static_refund_CallToSuicideTwice|selfdestruct|
|stSystemOperationsTest/ABAcallsSuicide0|selfdestruct|
|stSystemOperationsTest/doubleSelfdestructTest|selfdestruct|
|stSystemOperationsTest/doubleSelfdestructTest2|selfdestruct|
|stSystemOperationsTest/doubleSelfdestructTouch|selfdestruct|
|stSystemOperationsTest/extcodecopy|src/GeneralStateTestsFiller/stSystemOperationsTest/extcodecopyFiller.json:66
block.difficulty|
|stSystemOperationsTest/suicideAddress|selfdestruct|
|stSystemOperationsTest/suicideCaller|selfdestruct|
|stSystemOperationsTest/suicideCallerAddresTooBigLeft|selfdestruct|
|stSystemOperationsTest/suicideCallerAddresTooBigRight|selfdestruct|
|stSystemOperationsTest/suicideNotExistingAccount|selfdestruct|
|stSystemOperationsTest/suicideOrigin|selfdestruct|
|stSystemOperationsTest/suicideSendEtherPostDeath|selfdestruct|
|stSystemOperationsTest/suicideSendEtherToMe|selfdestruct|
|stTransactionTest/Opcodes_TransactionInit|tests/src/GeneralStateTestsFiller/stTransactionTest/Opcodes_TransactionInitFiller.json:
413 selfdestruct|
|stTransactionTest/SuicidesAndInternlCallSuicidesBonusGasAtCall|selfdestruct|
|stTransactionTest/SuicidesAndInternlCallSuicidesBonusGasAtCallFailed|selfdestruct|
|stTransactionTest/SuicidesAndInternlCallSuicidesSuccess|selfdestruct|
|stTransactionTest/SuicidesAndSendMoneyToItselfEtherDestroyed|selfdestruct|
|stTransactionTest/SuicidesStopAfterSuicide|selfdestruct|
|stWalletTest/walletKill|src/GeneralStateTestsFiller/stWalletTest/walletKillFiller.json:41 selfdestruct|
|stWalletTest/walletKillToWallet|src/GeneralStateTestsFiller/stWalletTest/walletKillToWalletFiller.json:41 selfdestruct|
|stZeroCallsTest/ZeroValue_SUICIDE|selfdestruct|
|stZeroCallsTest/ZeroValue_SUICIDE_ToEmpty|selfdestruct|
|stZeroCallsTest/ZeroValue_SUICIDE_ToNonZeroBalance|selfdestruct|
|stZeroCallsTest/ZeroValue_SUICIDE_ToOneStorageKey|selfdestruct|

Most of the failed testing cases caused by opcodes `SELFDESTRUCT`,`PREVRANDAO(DIFFICULTY)`.

In scroll, `SELFDESTRUCT` cause ErrInvalidOpCode and `PREVRANDAO(DIFFICULTY)` always return 0.

### Conclusion

According to the testing result, the following are considered incompatible:

- `SELFDESTRUCT`: Currently disabled in scroll EVM, `SELFDESTRUCT` will be replaced by `SENDALL` in the future.
  An [EIP-4758](https://eips.ethereum.org/EIPS/eip-4758) describe more detailed info for this change.
- `PREVRANDAO(DIFFICULTY)`: After `the merge` fork, evm should return the value of the mixHash field, which
  is usually used as randomness source. Currently, this opcode return 0 in Scroll zkEVM.
  An [EIP-4399](https://eips.ethereum.org/EIPS/eip-4399) describe more detailed info for this change.
- `COINBASE`:  After `the merge` fork, evm should return the value of the validator's address.
  Currently, this opcode return an address of pre-deployed fee management address.
- `BLOCKHASH(blockNum)`: In Ethereum EVM, the input is a block number starting from the top of the stack, with a valid
  range of [NUMBER-256, NUMBER-1], and the output is the hash of the given block. If the block number is not within the
  valid range, return 0. In Scroll zkEVM, the input range for block number is restricted to NUMBER-1. This behavior is
  not covered by above testing, we reference [the doc](<https://mp.weixin.qq.com/s/iCfHzJiqHocHbOl2Zqa92A>) by scroll
  team.

## Polygon zkEVM

Since Polygon zkEVM have different state machine to interpret the EVM opcodes to `zkasm`, the method we used on Scroll
can not be applied directly on Polygon zkEVM. Polygon zkEVM team have use the same testing vectors with their dedicated
[test facility](https://github.com/0xPolygonHermez/zkevm-testvectors).

We tried to re-execute the same testing they did. But by some unknown reason, we *can not get the same test result* as they
got. We can not sure why the testing result could be different. So, the following OPCODE compatibility is inferred by
official [ignored testing cases](https://github.com/0xPolygonHermez/zkevm-testvectors/blob/main/tools/ethereum-tests/no-exec.json)
and the official documents
about [differences between EVM and ploygon zkEVM](https://wiki.polygon.technology/docs/zkEVM/protocol/evm-diff)(these testvectors are excluded by official).

### Conclusion

By methodology that we introduced above, the following are considered incompatible:

- `SELFDESTRUCT`: removed and replaced by SENDALL. Related test cases
  are [ignored]((https://github.com/0xPolygonHermez/zkevm-testvectors/blob/main/tools/ethereum-tests/no-exec.json#L1547))
  .
- `EXTCODEHASH` : returns the hash of the contract bytecode from the zkEVM state tree without checking if the account is
  empty.
- `DIFFICULTY` : returns "0" instead of a random number as in the EVM. Related test cases are
  [ignored](https://github.com/0xPolygonHermez/zkevm-testvectors/blob/main/tools/ethereum-tests/no-exec.json#L9043).
- `BLOCKCHASH` : returns all previous block hashes instead of just the last 256 blocks.
  BLOCKCHASH is the state root at the end of a processable transaction and is stored on the system smart contract.
- `NUMBER` : returns the number of processable transactions.
- `GASLIMIT`: should return gas limit of current block. Related test cases
  are [ignored](https://github.com/0xPolygonHermez/zkevm-testvectors/blob/main/tools/ethereum-tests/no-exec.json#L9047).

## Optimism

### Step 1: build 

Optimism recently released the [bedrock](https://community.optimism.io/docs/developers/bedrock/explainer/). Bedrock
version use the new [op-geth client](https://github.com/ethereum-optimism/op-geth.git). We execute test cases on commit
[6d55908347cac7463dd6a2cb236f30ec26c9a121](https://github.com/ethereum-optimism/op-geth/commit/6d55908347cac7463dd6a2cb236f30ec26c9a121)
.

```shell
git clone https://github.com/ethereum-optimism/op-geth.git
cd op-geth
git checkout 6d55908347cac7463dd6a2cb236f30ec26c9a121
make all
cd ..
```

### Step 2: run 

op-geth is the execution engine of Optimism, which is responsible for executing the blocks it
receives from the rollup node and storing state. It also exposes standard JSON-RPC methods to query blockchain data and
submit transactions to the network. op-geth is a [minimal fork]( https://op-geth.optimism.io/ ) of go-ethereum.

We organize the testcases and commands for optimism, just run the following shell scripts:

```shell
sh ./runtest.sh optimism ./op-geth/build/bin/evm
```

The testing result is as following table:

folder|total|pass|total fail|fail with known cause|pass rate
|--|--|--|--|--|--|
| EIPTests | 6 | 6 | 0 | 0 | 100.00%
| VMTests | 64 | 64 | 0 | 0 | 100.00%
| stArgsZeroOneBalance | 46 | 46 | 0 | 0 | 100.00%
| stAttackTest | 2 | 2 | 0 | 0 | 100.00%
| stBadOpcode | 121 | 121 | 0 | 0 | 100.00%
| stBugs | 5 | 5 | 0 | 0 | 100.00%
| stCallCodes | 80 | 80 | 0 | 0 | 100.00%
| stCallCreateCallCodeTest | 43 | 43 | 0 | 0 | 100.00%
| stCallDelegateCodesCallCodeHomestead | 58 | 58 | 0 | 0 | 100.00%
| stCallDelegateCodesHomestead | 58 | 58 | 0 | 0 | 100.00%
| stChainId | 2 | 2 | 0 | 0 | 100.00%
| stCodeCopyTest | 2 | 2 | 0 | 0 | 100.00%
| stCodeSizeLimit | 5 | 5 | 0 | 0 | 100.00%
| stCreate2 | 51 | 51 | 0 | 0 | 100.00%
| stCreateTest | 43 | 43 | 0 | 0 | 100.00%
| stDelegatecallTestHomestead | 28 | 28 | 0 | 0 | 100.00%
| stEIP150Specific | 14 | 14 | 0 | 0 | 100.00%
| stEIP150singleCodeGasPrices | 40 | 40 | 0 | 0 | 100.00%
| stEIP1559 | 13 | 13 | 0 | 0 | 100.00%
| stEIP158Specific | 7 | 7 | 0 | 0 | 100.00%
| stEIP2930 | 7 | 7 | 0 | 0 | 100.00%
| stEIP3607 | 5 | 5 | 0 | 0 | 100.00%
| stExample | 9 | 6 | 3 | 0 | 66.67%
| stExtCodeHash | 32 | 32 | 0 | 0 | 100.00%
| stHomesteadSpecific | 5 | 5 | 0 | 0 | 100.00%
| stInitCodeTest | 17 | 17 | 0 | 0 | 100.00%
| stLogTests | 46 | 46 | 0 | 0 | 100.00%
| stMemExpandingEIP150Calls | 9 | 9 | 0 | 0 | 100.00%
| stMemoryStressTest | 38 | 38 | 0 | 0 | 100.00%
| stMemoryTest | 71 | 71 | 0 | 0 | 100.00%
| stNonZeroCallsTest | 24 | 24 | 0 | 0 | 100.00%
| stQuadraticComplexityTest | 16 | 16 | 0 | 0 | 100.00%
| stRandom | 314 | 314 | 0 | 0 | 100.00%
| stRandom2 | 225 | 225 | 0 | 0 | 100.00%
| stRecursiveCreate | 2 | 2 | 0 | 0 | 100.00%
| stRefundTest | 23 | 23 | 0 | 0 | 100.00%
| stReturnDataTest | 41 | 41 | 0 | 0 | 100.00%
| stRevertTest | 46 | 46 | 0 | 0 | 100.00%
| stSLoadTest | 1 | 1 | 0 | 0 | 100.00%
| stSStoreTest | 28 | 28 | 0 | 0 | 100.00%
| stSelfBalance | 6 | 6 | 0 | 0 | 100.00%
| stShift | 42 | 42 | 0 | 0 | 100.00%
| stSolidityTest | 18 | 18 | 0 | 0 | 100.00%
| stSpecialTest | 15 | 15 | 0 | 0 | 100.00%
| stStackTests | 10 | 10 | 0 | 0 | 100.00%
| stStaticCall | 286 | 286 | 0 | 0 | 100.00%
| stStaticFlagEnabled | 13 | 13 | 0 | 0 | 100.00%
| stSystemOperationsTest | 67 | 67 | 0 | 0 | 100.00%
| stTimeConsuming | 14 | 14 | 0 | 0 | 100.00%
| stTransactionTest | 29 | 27 | 2 | 0 | 93.10%
| stTransitionTest | 6 | 6 | 0 | 0 | 100.00%
| stWalletTest | 42 | 42 | 0 | 0 | 100.00%
| stZeroCallsRevert | 16 | 16 | 0 | 0 | 100.00%
| stZeroCallsTest | 24 | 24 | 0 | 0 | 100.00%
| stZeroKnowledge | 133 | 133 | 0 | 0 | 100.00%
| stZeroKnowledge2 | 130 | 130 | 0 | 0 | 100.00%
|total| 2498 | 2493 | 5 | 0 | 99.80%

### Conclusion

Since the Bedrock version of Optimism is [minimal fork]( https://op-geth.optimism.io/ ) of go-ethereum.
Most testcases are passed. Meanwhile, according
to [the official documents](https://community.optimism.io/docs/developers/build/differences/#bedrock),
the opcode `COINBASE` is unsupported by current `op-geth` version.
The opcodes `DIFFICULTY`,`ORIGIN`,`CALLER` may have minor differences with ethereum,
which should not be considered as incompatible(so we only give warnings
in our hardhat plugins):

- `DIFFICULTY`: Random value (same with go-ethereum).
  But as this value is set by the sequencer, it is not as reliably random as the L1 equivalent.
- `ORIGIN`: different only when L1 ⇒ L2 transaction
- `CALLER`: different only when L1 ⇒ L2 transaction
