// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract C3 {
    string m;

    constructor() {
        string memory x = "0000000000000000000000000000000000000000000000000";
        m = x;
    }

    function bar() public payable returns (uint256) {
        address payable bob;
        uint256 tmp = block.difficulty + 2;
        selfdestruct(bob);
        return tmp;
    }
}
