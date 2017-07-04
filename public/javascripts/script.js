
//var stockContainer = $('#stockContainer');
//var someStocks = $('#someStocks');

var socket = io.connect();

///connect to socket
socket.on('connect', function () {
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
    $("#someStocks").load(location.href+" #someStocks>*","");
    alert(data);
});

/*var writeStocks = function () {
    for (var i=0; i<activeStocks.length; i++) {
        stockContainer.append('<div>' + activeStocks[i] + '</div>');
    }
};*/