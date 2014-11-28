var onRecieve = function(){};
var onError = function(){};
var onDisconnected = function(){};
var onConnected = function(){};
var onInitializing = function(){};
var onInitialized = function(){};

var express = require('express');
var logger = require ('../../Core/Logger.js');

app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server);

function start(){
	server.listen(4000);
	logger.log("WebSockets listening in port 4000");
}

function stop(){

	
}

function initialize(parameters){
    io.sockets.on('connection', function(socket){
    	
    	var address =socket.request.connection.remoteAddress;

    	logger.log("Client connected through WebSockets : " + address);
	
		socket.on('register', function(data, callback){
			logger.log("New user added to WebSockets : " + data);
			onConnected(socket, data);
			callback({isSuccess:true, message:"Successfully Registered!!!"});
		});
	
		socket.on('command', function(data, callback){
			onRecieve(data);
		});

    	socket.on('disconnect', function(data){
    		logger.log("User disconnecting in WebSockets : " + data)
			onDisconnected(socket, data);
		});
	
		socket.emit('connected',{isSuccess:true});
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
