var onRecieve = function(){};
var onError = function(){};
var onDisconnected = function(){};
var onConnected = function(){};
var onInitializing = function(){};
var onInitialized = function(){};

var express = require('express');
app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server);

function start(){
	server.listen(4000);
	console.log('Sucessfully accessed Start method of Websocket. Enjoy');
}

function stop(){

	
}

function initialize(parameters){
    io.sockets.on('connection', function(socket){
    	console.log ("client connected!!!")
		socket.on('new user', function(data, callback){
			console.log ("new user");
			callback(true);
			onConnected(socket, data);
		});
	
		socket.on('send message', function(data, callback){
			console.log (data);
			onRecieve(data);
		});

    	socket.on('disconnect', function(data){
    		console.log ("disconecvted : " + data)
			onDisconnected(socket, data);
		});
	
	});

}

function updateNicknames(){
		io.sockets.emit('usernames', Object.keys(users));
}

function send(parameters){

}

exports.endpoint = {
	start : function(){start()},
	stop : function(){stop()},
	initialize: function(parameters){ initialize(parameters)},
	onError: function(func){ onError = func; },
	onRecieve: function(func){ onRecieve = func; },
	onDisconnected: function(func){ onDisconnected = func; },
	onConnected: function(func){ onConnected = func;},
	onConnecting: function(func){ onConnecting = func; },
	isStateful: true
}
