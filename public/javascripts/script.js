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

var activeStocks;
var socket = io.connect();

///connect to socket
socket.on('connect', function () {
    socket.emit('join', 'Hello World from client');
    console.log('connected');
});

///use submit button to send the new stock to server
$('#addStock').on('submit', function(e){
    //var stockList = $('#stockList');
    socket.emit('submitStock', ['pls work', 'andrew']);
    console.log('submitted');
});

//retrieve the new stock from the server and update list
socket.on('activeStocks', function() {
    //how to update activeStocks here??
    socket.emit('updateMyStocks', 'you now have all the stocks');
    //location.reload();
});

//check if its updated
socket.on('updated', function (data) {
    alert(data);
});