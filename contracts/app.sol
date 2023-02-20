// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
import "./lib1.sol";

contract A {
    uint256 d;

    function hello()
        public
        returns (
            string memory,
            string memory,
            bytes memory
        )
    {
        B b = new B();
        string memory strB = b.foo();
        address f=tx.origin;
         f.delegatecall(
            abi.encodeWithSignature("foo(uint256)", 1)
        );
        
        
        string
            memory x = "1111111111111111111111111111111111111111111111111111111111111111111111111111111";
        bytes
            memory z = "2222222222222222222222222222222222222222222222222222222222222222222222222222222";

        d = block.difficulty;
        return (x, strB, z);
    }
}
