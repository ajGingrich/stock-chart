var socket = io.connect();

///connect to socket
socket.on('connect', function () {
    console.log('connected');
});

///use submit button to send the new stock to server
$('#addStock').on('submit', function(e){
    //var stockList = $('#stockList');
    socket.emit('submitStockToServer');
    console.log('submitted');
});

//retrieve information on new stock and send back request to server
socket.on('newStockToClient', function() {
    socket.emit('updateMyStocks');
});

//check if its updated
socket.on('updated', function () {
    ///partially reload stock div
    $("#stockContainer").load(location.href+" #stockContainer>*","");
});