var configurationManager = require("../Core/ConfigurationManager.js")
var clientRegistry  = require("../Core/ClientRegistry.js")
var authManager  = require("../Core/AuthenticationManager.js")
var commandDispatcher  = require("./CommandManager.js")
var logger = require("../Core/Logger.js");
var integrationManager  = require("./IntegrationManager.js")
var eventManager = require("./EventManager.js")
var loadedProtocols = []

function start(){
	var settings = configurationManager.getConfiguration
	for(index in settings){
		var setting = settings[index];
		var protocol = require("../Extensions/Endpoint/" + setting.protocol + ".js");
		
		protocol.endpoint.onConnected(function(socket,parameters){
			
			var authData = authManager.authenticate(parameters);

			if (authData){
				clientRegistry.addClient(socket, parameters, authData);
				integrationManager.integrate(authData);
				eventManager.tasks.trigger("userstatechanged",{userName:parameters.userName, state:"online"},clientRegistry);
			}
			else{
				logger.log("Client Registration Failed : " + parameters.userName);
			}
		});

		protocol.endpoint.onDisconnected(function(socket, parameters){
			//if (protocol.isStateful)
				var removeClient = clientRegistry.removeClient(socket, parameters) ;

				if (removeClient)
				{
					eventManager.tasks.unsubscribeAll(removeClient.data);
				}

				eventManager.tasks.trigger("userstatechanged",{userName:removeClient.data.userName, state:"offline"},clientRegistry);
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