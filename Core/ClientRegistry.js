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

function getResource(routingInfo){
	var currentIndex = random(0, onlineClients.length-1);
	logger.log("CurrentIndex : " + currentIndex);
	var currentClient = onlineClients[currentIndex];


	if (currentClient.data.userName === routingInfo.requestor){
		currentIndex = random(0, onlineClients.length-1);
		currentClient = onlineClients[currentIndex];
	}

	logger.log("Resource Acquired : " + currentClient.data.userName);
	return currentClient; //getClient(currentClient.data.userName)	
	
}


function random (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}


exports.addClient = addClient
exports.removeClient = removeClient
exports.getAllClients = getAllClients
exports.getClient = getClient
exports.getResource = getResource