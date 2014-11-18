var configurationManager = require("../Core/ConfigurationManager.js")
var clientRegistry  = require("../Core/ClientRegistry.js")
var commandDispatcher  = require("./CommandManager.js")

var loadedProtocols = []

function start(){
	var settings = configurationManager.getConfiguration
	for(index in settings){
		var setting = settings[index];
		var protocol = require("../Extensions/Endpoint/" + setting.protocol + ".js");
		
		protocol.endpoint.onConnected(function(parameters){
			if (protocol.isStateful)
				clientRegistry.addClient(parameters) ;
		});

		protocol.endpoint.onDisconnected(function(parameters){
			if (protocol.isStateful)
				clientRegistry.removeClient(parameters) ;
		});

		protocol.endpoint.onRecieve(function(parameters){
			commandDispatcher.dispatch(parameters);
		});
		
		protocol.endpoint.initialize(setting.settings);

		loadedProtocols.push(protocol.endpoint);
	}

	for(index in loadedProtocols)
		loadedProtocols[index].start();

}

function getProtocols(){
	return loadedProtocols;
}

exports.start = start
exports.getProtocols = getProtocols