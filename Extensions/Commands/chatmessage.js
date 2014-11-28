
var clientRegistry = require("../../Core/ClientRegistry.js")

function execute(commandData){

	console.log ("Chat message recieved send to : " + commandData.data.to + ", message : " + commandData.data.message);

	//to, from, message
	var toClient = clientRegistry.getClient(commandData.data.to);

	if (toClient){ //client is online
		toClient.invokeCommand(commandData.name, commandData.data);
	}
	else { //client is offline
	}
}


exports.execute = execute