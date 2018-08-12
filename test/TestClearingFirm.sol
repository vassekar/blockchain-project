pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/ClearingFirm.sol";

contract TestClearingFirm {
  ClearingFirm clearingFirm = ClearingFirm(DeployedAddresses.ClearingFirm());


// Testing the adopt() function
function testAddTtrades() public {

 uint returnedId = clearingFirm.addtradestoClear(10);

// uint returnedId = clearingFirm.getTradecount();

  uint expected = 1;

  Assert.equal(returnedId, expected, "Clearing trade id is 1.");
}

}