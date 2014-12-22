
var clientRegistry = require("../../Core/ClientRegistry.js")


function execute(commandData){


	//to, command, data, persistIfOffline, alwaysPersist
	var toClient = clientRegistry.getClient(commandData.data.to);

	var canPresist = false;


	if (toClient){ 
		console.log ("Dispatching client!!!! - " + commandData.data.command + "   ,TO : " + commandData.data.to)
		console.log(commandData.data.data)

		toClient.invokeCommand(commandData.data.command, commandData.data.data);
		if (commandData.data.alwaysPersist == true)
			canPresist = true;
	}
	else if (commandData.data.persistIfOffline == true || commandData.data.alwaysPersist == true) { 
		canPresist = true;
	}

	if (canPresist){
		//write your persistance logic here
	}
}


exports.execute = execute