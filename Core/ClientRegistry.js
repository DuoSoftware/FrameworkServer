var logger = require("./Logger.js");

var onlineClients = []

// socket, data

function addClient(socket, clientData, authData){
	logger.log("New client registered : " + clientData.userName)
	onlineClients.push({socket: socket, data: clientData});

	users = [];
	for (index in onlineClients)
		users.push(onlineClients[index].data.userName)

	for (index in onlineClients)
		onlineClients[index].socket.emit('usernames', users);
}

function removeClient (socket, clientData){
	var removeIndex = -1;
	for (index in onlineClients)
	if (onlineClients[index].socket === socket){
		removeIndex = index;
		break;
	}

	if (removeIndex !=-1)
		onlineClients.splice(removeIndex,1);
}

function getAllClients(authenticationData){
	return onlineClients;
}	


function getClient(username){

	for (index in onlineClients)
	if (onlineClients[index].data.userName === username){
		return {
			sendMessage : function(to, from, message){
				var msg = {to: to, from: from, message: message};
				
				var sendClient;
				for (sIndex in onlineClients){

					if (onlineClients[sIndex].data.userName === to){
						sendClient = onlineClients[sIndex];
						break;

					}
				}

				sendClient.socket.send(msg)
			}
		}	
	}

	return null;
}

exports.addClient = addClient
exports.removeClient = removeClient
exports.getAllClients = getAllClients
exports.getClient = getClient