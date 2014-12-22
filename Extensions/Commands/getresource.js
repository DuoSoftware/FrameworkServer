
var clientRegistry = require("../../Core/ClientRegistry.js")

function execute(commandData){

	

	var resourceObject = clientRegistry.getResource(commandData);

	var toClient = clientRegistry.getClient(commandData.data.requestor);

	console.log ({name:resourceObject.data.userName});
	toClient.invokeCommand("resourceAcquired", {name:resourceObject.data.userName});


}


exports.execute = execute