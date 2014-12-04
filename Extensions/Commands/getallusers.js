
var clientRegistry = require("../../Core/ClientRegistry.js")

function execute(commandData){

	console.log ("GETTING ALL USERS!!!!");

	//from
	var toClient = clientRegistry.getClient(commandData.data.from);
	var allClients = clientRegistry.getAllClients();
	var sendUsers = [];
	for (index in allClients)
		sendUsers.push({userName:allClients[index].data.userName});

	console.log(sendUsers);

	if (toClient){
		toClient.invokeCommand("usersloaded", {users: sendUsers});
	}
}


exports.execute = execute