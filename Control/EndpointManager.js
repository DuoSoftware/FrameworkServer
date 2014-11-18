var configurationManager = require("../Core/ConfigurationManager.js")
var clientRegistry  = require("../Core/ClientRegistry.js")
var commandDispatcher  = require("./CommandManager.js")

var loadedProtocols = []

function start(){
	var settings = configurationManager.getConfiguration
	for(index in settings){
		var setting = settings[index];
		var protocol = require("../Extensions/Endpoint/" + setting.protocol + ".js");
		
		protocol.endpoint.onConnected(function(socket,parameters){
			
			//if (protocol.isStateful == true){
				clientRegistry.addClient(socket,parameters) ;
			//}
		});

		protocol.endpoint.onDisconnected(function(socket, parameters){
			//if (protocol.isStateful)
				clientRegistry.removeClient(socket, parameters) ;
		});

		protocol.endpoint.onRecieve(function(parameters){
			console.log (parameters)
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