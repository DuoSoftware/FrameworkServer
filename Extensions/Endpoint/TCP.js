var net = require('net');
var _ = require('underscore');
var sys = require('sys');
var path = require('path');
var express = require('express');
var io = require('socket.io');
var EventEmitter = require('events').EventEmitter;
var app = express();
var http = require('http').createServer(app);
var chat = 
{ 
    createServer: function(config)
    {      
        var emitter = new EventEmitter();
        var onSocketConnection = function(socket)
        {
            emitter.emit('client connected', socket);  
        }; 
        return{
            on:function(event,fn)
            {
                emitter.on(event,fn);
            },
            start:function()
            {        
                if(config.httpServer != null)
                {
                    var io = require('socket.io').listen(config.httpServer);  
                    io.sockets.on('connection',onSocketConnection);
                }
                if(config.tcpHost != null && config.tcpPort != null)
                {
                    var server = net.Server(); 
                    server.on('connection',onSocketConnection);
                    server.listen(config.tcpPort,config.tcpHost);      
                }       
            }
        };
    },
    createManager:function()
    {
        var emitter = new EventEmitter();
        var clients=[];
        var getFreeID = function()
        {
            var id = 1;
            while(_.where(clients, {id:id}).length>0)
            {
                id++;      
            }
            return id;    
        };  
        var mgr = 
        {    
            on:function(event,fn)
            {
                emitter.on(event,fn);   
            },
            add:function(client)
            {
                client.id = getFreeID();
                client.manager = mgr;
                client.broadcast = function(event,data)
                {
                    var others = _.filter(clients, function(current)
                    {
                       return current.id != client.id; 
                    });
                    _.each(others, function(current)
                    {
                    current.emit(event, data);
                    });    
                };
                client.on('message',function(data)
                {
                    emitter .emit('client message' , {
                        client : client,
                        data: data
                    });
                });           
                client.on('disconnect', function()
                {
                    emitter.emit('client disconnect', client);        
                });
                clients.push(client);
                return client;
            }
            
        };
        return mgr;
        
    },   
    transformSocket: function(socket)
    {
    var client={};
    if(socket.id == null)
    {
        var emitter = new EventEmitter();
        socket.on('data', function(data)
        {
            var parsed = JSON.parse(data);
            emitter.emit(parsed.event || 'data', parsed.data);
});
            socket.on('error', function(error)
            {
                if(error.code == 'ECONNRESET')
                {
                    emitter.emit('disconnect');   
                }
            });
            client = 
            {
            on:function(event,fn)
            {
                emitter.on(event,fn);
            },
            emit:function(event,data)
            {
                socket.write(JSON.stringify({
                    event:event,
                    data:data
                }));
            }
            };
    }
    else
    {
        client = 
        {
            on:function(event,fn)
            {
               socket.on(event,fn);
            },
            emit:function(event,data)
            {
              socket.emit(event,data);
            }
        };
    }
        return client;
    }
};
var args = process.argv.slice(2);
var server = chat.createServer(
{
        tcpHost:args[0],
        tcpPort:args[1]     
});

var onRecieve = function(){
    rec();
};
var onError = function(){};
var onDisconnected = function(){
    stop();
};
var onConnected = function(){
    start();
};
var onInitializing = function(){};
var onInitialized = function(){};

function start(){
    
    server.start();  
}

function stop(){
	
}

function initialize(parameters){
    
    start();
    send();
    rec();

}

function rec()
{
    var args = process.argv.slice(2);
    var server = net.connect (args[1], args[0], function()              
    {
        server.on('data',function(data)
        {
            var parsed = JSON.parse(data.toString());
            console.log(parsed.data.message);        
        });   
    });
    process.openStdin().addListener('data',function(data)
    {
        var msg = data.toString().substr(0,data.length-1);
        server.write(JSON.stringify({
        event:'message',
        data: 
        {
            message:msg
        }
        }));
    });   
}

function send()
{
    var mgr = chat.createManager();
    server.on('client connected',function(socket)
    {
        var client = chat.transformSocket(socket);
        client.emit('message', {
            message: 'TCP connection successful! All the messages of Clients are below' 
        });
        mgr.add(client);
        client.broadcast('message', {
        message: 'User connected'
        });
    });
    mgr.on('client message', function(data)
    {
        data.client.broadcast('message',data.data);  
    });
}

start();
send();
rec();

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