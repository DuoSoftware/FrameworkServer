var onlineClients = []

// protocol, data

function addClient(protocol, clientData){
	onlineClients.push({protocol: protocol, data: clientData})
}

function removeClient (clientData){
	var removeIndex = -1;
	for (index in onlineClients)
	if (onlineClients[index].data.sessionId === clientData.sessionId){
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
				onlineClients[index].protocol.send({to: to, from: from, message: message, sessionId: onlineClients[index].data.sessionId})
			}
		}	
	}

	return null;
}

exports.addClient = addClient
exports.removeClient = removeClient
exports.getAllClients = getAllClients
exports.getClient = getClient