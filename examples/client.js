'use strict';
var osc = require('../lib');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var client = new osc.Client('127.0.0.1', 12345);
app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});


io.on('connection', function(socket){
  console.log('a user connected');

   socket.on('switchmode',function(num){
        console.log("get switchmode :"+num);
        sendMode(num)
    });
});


function sendMode(num){
    client.send('/mode/switch', num)
}
//client.send('/mode/switch', 2, function (err) {
//  if (err) {
//    console.error(new Error(err));
//  }
//  client.kill();
//});

// or
// var msg =  new osc.Message('/address')
// msg.append("testing");
// msg.append("testing");
// msg.append(123);
// client.send(msg)

// or
// var msg = new osc.Message('/address', 1, 2, 3);
// client.send(msg);
