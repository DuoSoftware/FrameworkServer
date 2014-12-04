var logger = require("./Logger.js");

var onlineClients = [];

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

	var removeClient;

	if (removeIndex !=-1){

		removeClient = onlineClients[removeIndex];

		onlineClients.splice(removeIndex,1);
	}

	return removeClient;
}

function getAllClients(authenticationData){
	return onlineClients;
}	


function getClient(username){

	for (index in onlineClients)
	if (onlineClients[index].data.userName === username){
		return {
			//name, type, data, token
			invokeCommand : function(name,data){
				
				var sendClient;
				for (sIndex in onlineClients){

					if (onlineClients[sIndex].data.userName === username){
						sendClient = onlineClients[sIndex];
						break;

					}
				}

				sendClient.socket.send({name:name, type:"command", data:data});

			},
			triggerEvent : function(name,data){
				
				var sendClient;
				for (sIndex in onlineClients){

					if (onlineClients[sIndex].data.userName === username){
						sendClient = onlineClients[sIndex];
						break;

					}
				}

				logger.log("Eventing...")
				sendClient.socket.send({name:name, type:"event", data:data});

			},
		}	
	}

	return null;
}

exports.addClient = addClient
exports.removeClient = removeClient
exports.getAllClients = getAllClients
exports.getClient = getClient