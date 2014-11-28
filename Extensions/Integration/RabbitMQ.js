var amqp = require('amqplib');
var basename = require('path').basename;
var read = require('read');
var all = require('when').all;
var logger = require("../../Core/Logger.js");

function Extension() {
    
  var onRecieve = function(){};

  var connection;
  var channel;

  var Duos = 'exchange.users';

  function start (settings){
    logger.log("Initializing RabbitMQ...");

    setTimeout(function() {

        amqp.connect("amqp://" + settings.userName + ":" + settings.password +  "@" + settings.host).then(function(conn) {
          connection = conn;
          return conn.createChannel().then(function(ch) {
            channel = ch;

            var ok = ch.assertExchange(Duos, 'direct', {durable: true});

            ok = ok.then(function() {
              return ch.assertQueue(settings.queueName);
            });

            ok = ok.then(function(qok) {
              var queue = qok.queue;
              ch.bindQueue(queue, Duos, settings.queueName);
            });

            ok = ok.then(function(queue) {
              return ch.consume(queue, logMessage, {noAck: true});
            });
            return ok.then(function() {  
              logger.log("Listening to RabbitMQ queue : " + settings.queueName);
            });

            function logMessage(msg) {
              var jsonObject =  JSON.parse(msg.content);
              onRecieve(jsonObject)
            }
          });
        }).then(null, function (err)
        {
          logger.log("Error listening to RabbitMQ queue : " + err);
        }); 
        },1000*5);
  }
    
	function saveContent (content, parameters){
    var jsonString = JSON.stringify(content);
    channel.publish(ex, severity, new Buffer(jsonString));
  }


	return {
		start: function(parameters){start(parameters)},
		stop: function(){stop()},
		onRecieveContent: function(func){onRecieve = func;},
		saveContent: function(content, parameters){saveContent (content, parameters)}
	}
};


exports.newInstance = function(){ 
	var extension = new Extension();
	return extension;
};