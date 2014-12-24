var onRecieve = function(){};
var onError = function(){};
var onDisconnected = function(){};
var onConnected = function(){};
var onInitializing = function(){};
var onInitialized = function(){};

var net = require('net');
var logger = require ('../../Core/Logger.js');

var server = null;
var HOST = '127.0.0.1';
var PORT = 5000;

function start(){

    server.listen(PORT, HOST);
    logger.log("TCP listening in port 5000");
}

function stop(){

    
}

function initialize(parameters){

    server = net.createServer(function(socket) {
        
        var isDisconnected = false;

        var socketWrapper = {
            send: function(obj){
                var callbackObject =  JSON.stringify({command:"message", data:obj}) + "|";
                socket.write(callbackObject);
            }
        };

        logger.log("Client connected through TCP : " +  socket.remoteAddress +':'+ socket.remotePort);

        socket.on('data', function(data) {

            //console.log("TCP DATA!!!")
            //console.log(data)

            var commandObject = JSON.parse(data);

            //console.log(commandObject)

            var mainCommand = commandObject.command;

            switch(mainCommand){
                case "register":
                    logger.log("New user added to TCP : " + commandObject.data.userName);
                    onConnected(socketWrapper, commandObject.data);
                    var callbackObject =  JSON.stringify({command:"regCallback", data: {isSuccess:true, message:"Successfully Registered!!!"}}) + "|";
                    socket.write(callbackObject);
                    break;
                case "command":
                    onRecieve(commandObject.data);
                    break;
            }            
            
        });

        socket.on('error', function(error) {
            logger.log("User disconnecting in TCP due to an error: " + error)
            isDisconnected = true;
            onDisconnected(socketWrapper, {});
        });

        socket.on('close', function(data) {
            
            if (!isDisconnected){
                var eventData;
                if (data)
                    eventData = JSON.parse(data);
                else
                    eventData = {data:{}};
                logger.log("User disconnecting in TCP : " + eventData)
                onDisconnected(socketWrapper, eventData);
            }
        });
        
        var callbackObject =  JSON.stringify({command:"connected", data: {isSuccess:true}}) + "|";
        socket.write(callbackObject);
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
