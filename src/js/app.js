App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load pets.
    $.getJSON('../trades.json', function(data) {
      var tradesRow = $('#tradesRow');
      var tradeTemplate = $('#tradeTemplate');

      for (i = 0; i < data.length; i ++) {
        tradeTemplate.find('.stock-name').text(data[i].StockSymbol);
        tradeTemplate.find('.shares-count').text(data[i].NoofStocks);
        tradeTemplate.find('.trans-amount').text(data[i].Amount);
        tradeTemplate.find('.order-type').text(data[i].OrderType);
       
        tradesRow.append(tradeTemplate.html());
      }
    });

      return App.initWeb3();
  },

  initWeb3: function() {
   // Is there an injected web3 instance?
if (typeof web3 !== 'undefined') {
  App.web3Provider = web3.currentProvider;
} else {
  // If no injected web3 instance is detected, fall back to Ganache
  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
}
web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function() {
    $.getJSON('trades.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var ClearingFirmArtifact = data;
      App.contracts.ClearingFirm = TruffleContract(ClearingFirmArtifact);
    
      // Set the provider for our contract
      App.contracts.ClearingFirm.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the clearedTrades

      var i = App.getTradeCount();

      return ; 
    });
    

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.button_add', App.addTrades);
  },


  addTrades: function(event) {
    event.preventDefault();

    alert("I am here");
    var OrderType = $('OrderType').val();
    var StockName  =  $('StockSymbol').val();
    var Amount = parseInt($('Amount').val());
    var NoofStocks = parseInt($('NoofStocks').val());
    var TradeId;
    var ClearingFirmInstance;
   
    

web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0];

  App.contracts.ClearingFirm.deployed().then(function(instance) {
    ClearingFirmInstance = instance;

  // Add Trades to the clearing account

  TradeId = ClearingFirmInstance.addtradestoClear(NoofStocks,Amount,OrderType,StockName )

    return TradeId;
  }).then(function(result) {
    return App.addTrades();
  }).catch(function(err) {
    console.log(err.message);
  });
});

  },

};


$(function() {
  $(window).load(function() {
    App.init();
  });

});

