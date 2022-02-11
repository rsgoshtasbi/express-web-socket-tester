var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

connections = [];

server.listen(3000);
console.log('Server is running...');

io.sockets.on('connection', function(socket) {
    connections.push(socket);
    console.log("Connect: %s sockets are connected", connections.length);

    // Disconnect
    socket.on('disconnect', function(data) {
        connections.splice(connections.indexOf(socket), 1);
        console.log("Disconnect: %s sockets are connected", connections.length);
    })

    socket.on('NodeJS Server Port', function(data) {
        console.log(data);
        setInterval (function () {
            socket.emit('iOS Client Port', { msg: makeid(10)});
        }, 2000);  
        // while(true) {
        //     io.sockets.emit('iOS Client Port', { msg: "Hi iOS Client!"});
        //     setTimeout(1000);
        // }
    })
})

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}
