var logger = require ('../../Core/Logger.js');

var onRecieve = function(){};
var onError = function(){};
var onDisconnected = function(){};
var onConnected = function(){};
var onInitializing = function(){};
var onInitialized = function(){};

var express = require('express');
var app = express();

function start(){
	app.listen(3500);
}

function stop(){
	
}

function initialize(parameters){

	var bodyParser = require('body-parser');
	app.use(bodyParser.json());

	app.post('/:type/:name', function (req, res) {
		logger.log ("REST request recieved");
		var commandObject = {};
		commandObject.type = req.params.type;
		commandObject.name = req.params.name;
		commandObject.token = "";

		commandObject.data = req.body;
		onRecieve(commandObject);
		
		res.send("{\"result\" : \"ok\"}");
	})

	
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
	isStateful: false
}
