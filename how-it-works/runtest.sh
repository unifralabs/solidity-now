#!/bin/sh
set -e

folders=(
EIPTests stEIP2930                            stSLoadTest
VMTests                              stEIP3607                            stSStoreTest
stArgsZeroOneBalance                 stExample                            stSelfBalance
stAttackTest                         stExtCodeHash                        stShift
stBadOpcode                          stHomesteadSpecific                  stSolidityTest
stBugs                               stInitCodeTest                       stSpecialTest
stCallCodes                          stLogTests                           stStackTests
stCallCreateCallCodeTest             stMemExpandingEIP150Calls            stStaticCall
stCallDelegateCodesCallCodeHomestead stMemoryStressTest                   stStaticFlagEnabled
stCallDelegateCodesHomestead         stMemoryTest                         stSystemOperationsTest
stChainId                            stNonZeroCallsTest                   stTimeConsuming
stCodeCopyTest  stTransactionTest
stCodeSizeLimit stTransitionTest
stCreate2                            stQuadraticComplexityTest            stWalletTest
stCreateTest                         stRandom                             stZeroCallsRevert
stDelegatecallTestHomestead          stRandom2                            stZeroCallsTest
stEIP150Specific                     stRecursiveCreate                    stZeroKnowledge
stEIP150singleCodeGasPrices          stRefundTest                         stZeroKnowledge2
stEIP1559                            stReturnDataTest
stEIP158Specific                     stRevertTest
)
l2name=$1
echo "evm="${2}
ln -sf ${2} /usr/local/bin/evm
rm -rf ./output/${l2name}

DIR="./tests"
if [ -d "$DIR" ]; then
  cd tests 
  git checkout v11.3
  cd ..
else
  git clone --branch v11.3 https://github.com/ethereum/tests
fi

if [ -d ./tests/config ]; then
    rm -rf ./tests/config
fi

for ((i = 0; i < ${#folders[@]}; i++)); do
  mkdir -p "output/${l2name}/${folders[i]}"
  retesteth -t "GeneralStateTests/"${folders[i]} -- --datadir \
    ./tests/config/${i} --testpath ./tests \
    --clients t8ntool --all >./output/$1/${folders[i]}/log.txt &2>1 &
  done
wait

node load_test_result.js ./output/${l2name}

#retesteth -t  -- --datadir ./tests/config/tmp/ --testpath ./tests --clients t8ntool --all