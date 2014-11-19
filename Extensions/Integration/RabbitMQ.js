var amqp = require('amqplib');
var basename = require('path').basename;
var read = require('read');
var all = require('when').all;
  
var password = 'duo';

var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);

var onRecieve = function(){};
var onError = function(){};
var onDisconnected = function(){};
var onConnecting = function(){};
var onConnected = function(){};

var connection;
var channel;
var Duos = 'duoadminconnect';


function Extension() {
    
    function start (){
        
        server.listen(2000);
	    logger.log("WebSockets listening in port 2000");
        
        saveObject();
        getObject();
        
	}
    
	function saveObject (){
        
    
    var args = process.argv.slice(2);
    var severity = (args.length > 0) ? args[0] : 'duoadmin';
    var message = args.slice(1).join(' ') || 'Admin Message';

    amqp.connect('amqp://localhost').then(function(conn) {
      return (conn.createChannel().then(function(ch) {
        
        var ok = ch.assertExchange(Duos, 'direct', {durable: false});

        return ok.then(function() {
          ch.publish(ex, severity, new Buffer(message));
          console.log(" [x] Sent %s:'%s'", severity, message);
          return ch.close();
        });
      })).ensure(function() { conn.close(); });
    }).then(null, console.warn);

}



function getObject (){
        
       
setTimeout(function() 
    {

    var severities = process.argv.slice(2);
    if (severities.length < 1) {
      console.warn('Usage: %s [duoadmin] [duoclient] [error]',
                   basename(process.argv[1]));
      process.exit(1);
    }

    amqp.connect('amqp://localhost').then(function(conn) {
      process.once('SIGINT', function() { conn.close(); });
      return conn.createChannel().then(function(ch) {
  

        var ok = ch.assertExchange(Duos, 'direct', {durable: false});

        ok = ok.then(function() {
          return ch.assertQueue('', {exclusive: true});
        });

        ok = ok.then(function(qok) {
          var queue = qok.queue;
          return all(severities.map(function(sev) {
            ch.bindQueue(queue, Duos, sev);
          })).then(function() { return queue; });
        });

        ok = ok.then(function(queue) {
          return ch.consume(queue, logMessage, {noAck: true});
        });
        return ok.then(function() {
          console.log(' [*] Waiting for logs. To exit press CTRL+C.');
        });

        function logMessage(msg) {
          console.log(" [x] %s:'%s'",
                      msg.fields.routingKey,
                      msg.content.toString());
        }
      });
    }).then(null, console.warn);


               },1000*5);
    

	}


	return {
		start: function(parameters){start(parameters)},
		stop: function(){stop()},
		getObject: function(){getObject (parameters)},
		saveObject: function(){saveObject (object, parameters)}
	}
};


exports.newInstance = function(){ 
	var extension = new Extension();
	return extension;
};