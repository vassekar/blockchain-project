var ClearingFirm = artifacts.require("ClearingFirm");

module.exports = function(deployer) {
  deployer.deploy(ClearingFirm);
};
var TradingAccount = artifacts.require("TradingAccount");

module.exports = function(deployer) {
  deployer.deploy(TradingAccount);
};