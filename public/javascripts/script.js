var socket = io.connect();

//connect to socket
socket.on('connect', function () {
    console.log('connected');
});

///use submit button to send the new stock to server
$('#addStock').on('submit', function(){
    socket.emit('changeToStock');
    console.log('submitted');
});

///use remove button to delete a stock
$('.removeStock').on('submit', function(){
    socket.emit('changeToStock');
    console.log('submitted');
});

//retrieve information on new stock and send back request to server
socket.on('newStockToClient', function() {
    socket.emit('updateMyStocks', 'Your stocks are now updated');
});

//check if its updated
socket.on('updated', function (data) {
    ///partially reload stock div
    console.log(data);
    setTimeout(function(){
        $("#stockContainer").load(location.href +" #stockContainer>*","");
    }, 3000);
    //$("#stockContainer").load(location.href +" #stockContainer>*","");

});


