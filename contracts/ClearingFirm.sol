pragma solidity ^0.4.17;
import "./TradingAccount.sol";


/*Clearing firm clears the trade between the buyer and seller accounts.  Simple clearing firm functionality is taken for demonstration
Handling margin and other functions are out of scope.
*/
contract ClearingFirm
{
  
address owner;

  /* Trades are already happened. matching and clearing is done by this contract */
struct Trade
{
uint tradeId;
////uint orderType;
uint status;
uint amount;
//uint noofstocks;
//string stockname;
}

Trade[16] public Trades;
uint nextTradeId;

//Clearing firm creator is the only can execute deposit and withdraw from trading accounts
function Constructor () public {
    owner = msg.sender;
  }



/* add trades to clear, brokerage firms add these trades to clearing buckets. */
function addtradestoClear(uint _Amount) 
        public returns (uint Id)
{
 Trade storage _trade = Trades[nextTradeId];
_trade.tradeId=nextTradeId;
//_trade.stockname=_StockName;
//_trade.noofstocks=_NoofStocks;
//_trade.orderType=_OrderType;
_trade.status=0 ;
_trade.amount= _Amount; 
 nextTradeId ++;
 return Id;                 
}
      

function ClearTrade(address buyer, address seller, uint buytradeId,uint selltradeId, uint Amount) public payable returns(bool) 
{

require(msg.sender==owner);

TradingAccount a = TradingAccount(buyer);
TradingAccount b = TradingAccount(seller);

/* clear tades before deposit the Amount*/

Trades[buytradeId].status = 1;
Trades[selltradeId].status = 1;

b.withdraw(Amount);
a.deposit(Amount); 

return true;

}

   
//get all Trade fields
  function getTrade(uint id) public constant returns (uint,uint,uint){

   Trade storage t = Trades[id];

    return (t.tradeId, t.status, t.amount);
  }

 //Get the trade counts to traverse in GUI
  function getTradecount() public view returns(uint){

   return nextTradeId;

  }

}
