var express = require('express');
var passport = require('passport');
var router = express.Router();
var StockHandler = require('../app/controllers/stockHandler.server');
var stockHandler = new StockHandler();
var io = require('../server');

io.on('connection', function (socket) {
    //console.log('Client Connected..');

    ///retrieve new stock from client
    socket.on('changeToStock', function (data) {
        ///send new stocks to all clients except socket that started it.
        socket.broadcast.emit('newStockToClient', data);
    });

    socket.on('updateMyStocks', function (data) {
        ///only send to each updated client
        socket.emit('updated', data);
    });
});

//home page
router.get('/', stockHandler.getStocks, function(req, res) {
    res.render('index', { activeStocks: res.locals.activeStocks });
});

//profile
router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', { user: req.user });
});

//add a stock but get active stocks before and after login in case user isn't logged in
router.post('/add', stockHandler.getStocks, isLoggedIn, stockHandler.addStock, stockHandler.getStocks, function (req, res) {
    res.render('index', { activeStocks: res.locals.activeStocks });
});

//remove a stock but get active stocks before and after login in case user isn't logged in
router.post('/remove/:stockId', stockHandler.getStocks, isLoggedIn, stockHandler.removeStock, stockHandler.getStocks, function (req, res) {
    res.render('index', { activeStocks: res.locals.activeStocks });
});

//logout
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

//authentications for facebook, twitter and google.
// Facebook routes
router.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect: '/profile',
    failureRedirect: '/'
}));

// Twitter routes
router.get('/auth/twitter', passport.authenticate('twitter'));

router.get('/auth/twitter/callback', passport.authenticate('twitter', {
    successRedirect: '/profile',
    failureRedirect: '/'
}));

// Google routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/profile',
    failureRedirect: '/'
}));

module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    //res.render('index', { message: req.flash('You better sign up biatch') });
    res.render('index', { message: 'You need to be logged in' });
}