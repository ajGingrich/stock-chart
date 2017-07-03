/*Check for Jquery*/
/*$(document).ready(function() {
    $('.title').click(function() {
        $(this).effect('bounce', {times: 3}, 500);
    });
});*/


//var getTest = <% activeStocks %>

/*var stockList = ['1', 'oh boy', 'moar'];
var stockContainer = $('#stockContainer');

var writeStocks = function () {
    for (var i=0; i<stockList.length; i++) {
        stockContainer.append('<div>' + stockList[i] + '</div>');
    }
};

writeStocks();*/

var socket = io.connect();

///connect to socket
socket.on('connect', function (data) {
    socket.emit('join', 'Hello World from client');
});

///use submit button to send the new stock to server
$('#addStock').on('submit', function(e){
    //var stockList = $('#stockList');
    socket.emit('submitStock', 'here is the data');
});

//retrieve the new stock from the server and update list
socket.on('activeStocks', function(data) {
    //how to update activeStocks here??
    console.log(data);
});