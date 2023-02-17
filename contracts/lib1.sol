// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract B {
    string m;

    constructor() {
        string memory x = "0000000000000000000000000000000000000000000000000";
        m = x;
    }

    function foo() public payable returns (string memory) {
        address payable alice;
        string
            memory x = "3333333333333333333333333333333333333333333333333333333333333333333333333333333333";
        selfdestruct(alice);
        return x;
    }
}
