'use strict';

var Stocks = require('../models/stocks.js');

function stockHandler () {

    var request = require("request");

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
            } );
    };

    this.getStocks = function(req, res, next) {

        //find all of the stock tickers and push to array
        Stocks.find({}, function(err, docs) {
            if (err) throw err;
            res.locals.activeStocks = [];
            for (var i=0; i<docs.length; i++) {
                res.locals.activeStocks.push(docs[i].ticker);
            }
            return next();
        } );
    };


    /*this.historicalData = function(req, res) {

        var stockTicker = req.body.stockTicker;

        ///filter using google finance?

        ///res.render('index', {user: req.user});
        Stocks.create({
                user: req.user._id,
                ticker: stockTicker
            },
            function(err, doc) {
                if (err) throw err;
                res.render('index', {user: req.user});
            } );
    };*/
}

module.exports = stockHandler;