'use strict';

var Stocks = require('../models/stocks.js');
var googleFinance = require('google-finance');

function stockHandler () {

    this.addStock = function(req, res, next) {

        var stockTicker = req.body.stockTicker;

        ///filter using google finance?

        ///res.render('index', {user: req.user});
        Stocks.create({
            user: req.user._id,
            ticker: stockTicker
        },
            function(err, doc) {
                if (err) throw err;
                return next();
            });
    };

    this.getStocks = function(req, res, next) {

        //find all of the stock tickers and push to array
        Stocks.find({}, function(err, docs) {
            if (err) throw err;

            res.locals.activeStocks = [];
            var symbols = [];
            var ids= [];
            var users = [];
            for (var i=0; i<docs.length; i++) {
                symbols.push(docs[i].ticker);
                ids.push(docs[i]._id);
                users.push(docs[i].user);
            }

            ///get financial data here but this not efficient and would take a long time for many number
            googleFinance.historical({symbols: symbols, from: '2016-10-02', to: '2017-01-04'}, function(err, data) {

                for (var i=0; i<symbols.length; i++) {
                    var series = [];

                    for (var j=0; j< data[symbols[i]].length; j++) {
                        //convert date to milliseconds
                        var objDate = data[symbols[i]][j].date;
                        var milliseconds = objDate.getTime();
                        series.push([milliseconds,data[symbols[i]][j].close]);
                    }
                res.locals.activeStocks.push({id: ids[i], ticker: symbols[i], user: users[i], series: series});
                }
            return next();
            });

        });
    };

    this.removeStock = function(req, res, next) {
        var stockId = req.params.stockId;
        var userId = req.user.id;

        //check to make sure user is deleting their own stock

        //find and remove requested stock
        Stocks.findOneAndRemove({_id: stockId, user: userId}, function(err, docs) {
            if (err) throw err;
            console.log(docs);
            if (docs != null) {
                return next();
            }
            else {
                res.render('index', { message: 'You cant delete other peoples stocks' });
            }
        });
    };
}

module.exports = stockHandler;