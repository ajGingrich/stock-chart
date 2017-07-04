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
    //socket.emit('updateMyStocks', 'you now have all the stocks');
    $("#stockContainer").load(location.href+" #stockContainer>*","");
    //location.reload();
});

//check if its updated
/*socket.on('updated', function () {
    ///partially reload stock div
    $("#stockContainer").load(location.href+" #stockContainer>*","");
});*/