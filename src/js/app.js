App = {
  web3Provider: null,
  contracts: {},

  init: function () {
    // Load trades
    $.getJSON('../trades.json', function (data) {
      var tradesRow = $('#tradesRow');
      var tradeTemplate = $('#tradeTemplate');

      for (i = 0; i < data.length; i++) {
        tradeTemplate.find('.stock-name').text(data[i].StockSymbol);
        tradeTemplate.find('.shares-count').text(data[i].NoofStocks);
        tradeTemplate.find('.trans-amount').text(data[i].Amount);
        tradeTemplate.find('.order-type').text(data[i].OrderType);

        tradesRow.append(tradeTemplate.html());
      }
    });

    return App.initWeb3();
  },

  initWeb3: function () {
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

  initContract: function () {
    $.getJSON('ClearingFirm.json', function (data) {

      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var ClearingFirmArtifact = data;
      App.contracts.ClearingFirm = TruffleContract(ClearingFirmArtifact);

      // Set the provider for our contract
      App.contracts.ClearingFirm.setProvider(App.web3Provider);

      var ClearingFirmInstance;
    
      var i;
    
     App.contracts.ClearingFirm.deployed().then(function (instance) {
        ClearingFirmInstance = instance;

       // ClearingFirmInstance.addtradestoClear(100,100,1,"ndaq").call();

       ClearingFirmInstance.addtradestoClear(100,100,1,"ndaq").call().then(val=>{i=val});
       
    //  return ClearingFirmInstance.getTradecount().call();
       //alert(i);
       /*
        if(i>0)

        {
         for(j=0;j<i; j++)
          {
           v = ClearingFirmInstance.getTrade(j).call();    

           alert(v[0].toString());
           alert(v[1].toString());
          }
     
        }*/

      }).catch(function(err)
    {console.log(err.message);
    })  
      alert(i);
     return; 
    });
      //alert("this" + App.getTradecount())
      // Use our contract to retrieve and mark the clearedTrade

      return App.bindEvents();
    },

      bindEvents: function () {
          $(document).on('click', '#button_add', App.addTrades);
      },


      addTrades: function (event) {
        alert("I am here");
        event.preventDefault();

      
        var OrderType = $('OrderType').val();
        var StockName = $('StockSymbol').val();
        var Amount = parseInt($('Amount').val());
        var NoofStocks = parseInt($('NoofStocks').val());
        var TradeId;
        var ClearingFirmInstance;



        /*web3.eth.getAccounts(function (error, accounts) {
          if (error) {
            console.log(error);
          }

          var account = accounts[0];

          App.contracts.ClearingFirm.deployed().then(function (instance) {
            ClearingFirmInstance = instance;

            // Add Trades to the clearing account

            TradeId = ClearingFirmInstance.addtradestoClear(NoofStocks, Amount, OrderType, StockName)

            return TradeId;
          }).then(function (result) {
            return App.addTrades();
          }).catch(function (err) {
            console.log(err.message);
          });
        });*/

      },

};


  $(function() {
    $(window).load(function () {
      App.init();
    });

  });

