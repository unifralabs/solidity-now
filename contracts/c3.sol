// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract C3 {
    string m;

    constructor() {
        string memory x = "0000000000000000000000000000000000000000000000000";
        m = x;
    }

    /*中文测就哦发就哦分我和i会发 试*/
    function bar() public payable returns (uint256) {
        address payable bob
      ;
        uint256 tmp2 = block.difficulty + block.gaslimit;
        selfdestruct(
            /*中国汉字测试*/
            bob);
        return tmp2;
    }
}
