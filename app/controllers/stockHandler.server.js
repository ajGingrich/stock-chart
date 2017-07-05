'use strict';

var Stocks = require('../models/stocks.js');

function stockHandler () {

    //var request = require("request");

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
                res.locals.activeStocks.push({id: docs[i]._id, ticker: docs[i].ticker, user: docs[i].user});
                //console.log(res.locals.activeStocks);
            }
            return next();
        } );
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