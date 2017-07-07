var socket = io.connect();
var chart = $('#chart');

///connect to socket
socket.on('connect', function () {
    console.log('connected');
});

///use submit button to send the new stock to server
$('#addStock').on('submit', function(e){
    //var stockList = $('#stockList');
    socket.emit('changeToStock');
    console.log('submitted');
});

///use submit button to send the new stock to server
$('.removeStock').on('submit', function(e){
    //var stockList = $('#stockList');
    socket.emit('changeToStock');
    console.log('submitted');
});

//retrieve information on new stock and send back request to server
socket.on('newStockToClient', function() {
    socket.emit('updateMyStocks', 'Your stocks are now updated');
});

//check if its updated
socket.on('updated', function () {
    ///partially reload stock div
    $("#stockContainer").load(location.href+" #stockContainer>*","");
    //run chart script again
    //var script = chart.getElementsByTagName('script');
    //for (var i=0; i<script.length; i++) {
        //eval(script[i].innerHTML);
    //}

});


