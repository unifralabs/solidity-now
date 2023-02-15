// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;
import "./c3.sol";

contract C1 {
    uint256 d1;

    constructor() {
        C3 c3 = new C3();
        c3.bar();
        d1 = block.difficulty;
    }

    function hello() public payable returns (string memory) {
        return "111111111111111111111111111111111";
    }
}
