var onRecieve = function(){};
var onError = function(){};
var onDisconnected = function(){};
var onConnecting = function(){};
var onConnected = function(){};


function start(){
	
}

function stop(){
	
}

function initialize(parameters){

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
