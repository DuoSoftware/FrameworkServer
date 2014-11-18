var onlineClients = []

// socket, data

function addClient(socket, clientData){
	console.log ("adding client : " + clientData.userName);
	onlineClients.push({socket: socket, data: clientData});

	users = [];
	for (index in onlineClients)
		users.push(onlineClients[index].data.userName)

	console.log ("emitting message : " + users)
	for (index in onlineClients)
		onlineClients[index].socket.emit('usernames', users);
	console.log ("message emited");
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
					console.log ("iterating : " + onlineClients[sIndex].data.userName);

					if (onlineClients[sIndex].data.userName === to){
						sendClient = onlineClients[sIndex];
						break;

					}
				}

				//sendClient.socket.emit('send message', msg);
				sendClient.socket.send(msg)
				console.log ("MESSAGE SENT (" + to +", " + from + "): "  + msg);
			}
		}	
	}

	return null;
}

exports.addClient = addClient
exports.removeClient = removeClient
exports.getAllClients = getAllClients
exports.getClient = getClient