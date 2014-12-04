var logger = require("../Core/Logger.js");

function eventManager(){

	var subscriptions = [];
	var clientInfo = [];

	function subscribe(event,client){
 
		var sub = getSubscription(event);

		var isFound = false;
		for (index in sub.clients)
		if (sub.clients[index].userName == client.userName){
			isFound = true;
			break;
		}

		if (!isFound){
			sub.clients.push({userName:client.userName});
			clientInfo.push({userName:client.userName, event:event});
		}
		logger.log("Client '" + client.userName + "'' subscribed for event : " + event);
	}

	function unsubscribe(event,client){
		var sub = getSubscription(event);

		var removeIndex = -1;
		
		for (index in sub.clients)
		if (sub.clients[index].userName == client.userName){
			removeIndex = index;
			break;
		}

		if (removeIndex != -1){
			var subRemoveIndex = -1;
			sub.clients.splice(removeIndex, 1);
			
			for (index in clientInfo)
				if (clientInfo[index].userName == client.userName && clientInfo[index].event == event){
					subRemoveIndex = index;
					break;
				}

			if (subRemoveIndex !=-1)
				clientInfo.splice(index,1)
		}
	}

	function unsubscribeAll(client){

		logger.log("Unsubscribing all events of :" + client.userName)
		for (index in clientInfo)
		if(clientInfo[index].userName == client.userName)
			unsubscribe(clientInfo[index].event, client)

	}

	function trigger(event,data,clientRegistry){
		var sub = getSubscription(event);

		for (index in sub.clients){
			var userName = sub.clients[index].userName;
			var clientObject = clientRegistry.getClient(userName);
			
			logger.log("Event User : " + userName)
			if (clientObject)
				clientObject.triggerEvent(event,data);
			else{
				logger.log("Error triggering " + event + " | " + userName)
			}
		}
	}

	function getSubscription(event){
		var outSub;

		for(index in subscriptions){
			if (subscriptions[index].name == event){
				outSub = subscriptions[index];
				break;
			}
		}

		if (!outSub){
			outSub = {name:event, clients:[]};
			subscriptions.push(outSub);
		}

		return outSub;
	}

	return{
		subscribe: function(event, data){ subscribe(event,data); },
		unsubscribe: function(event,data){unsubscribe(event,data);},
		unsubscribeAll:function(client){unsubscribeAll(client)},
		trigger:function(event,data, clientRegistry){trigger(event,data,clientRegistry); }
	}

}

var x = new eventManager();
exports.tasks =  x;
