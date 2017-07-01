'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Stock = new Schema({
    user: String,
    ticker: String
});

module.exports = mongoose.model('Stock', Stock);