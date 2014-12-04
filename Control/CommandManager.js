var eventManager = require ("./EventManager.js")

function dispatchCommand (commandJson){
	if (commandJson)
	if (commandJson.type){
		

		//name, type, data, token

		switch(commandJson.type){
			case "command":
				if (commandJson.data){
					var commandObject = require("../Extensions/Commands/" + commandJson.name + ".js")
					commandObject.execute(commandJson)
				}
				break;
			case "event":
				if (commandJson.data){
					var commandObject = require("../Extensions/Events/" + commandJson.name + ".js")
					commandObject.execute(commandJson)
				}
				break;
			case "event-subscribe":
				if (commandJson.data){
					eventManager.tasks.subscribe(commandJson.name, commandJson.data);
				}
				break;
			case "event-unsubscribe":
				if (commandJson.data){
					eventManager.tasks.unsubscribe(commandJson.name, commandJson.data);
				}
				break;

		}

	}
}

exports.dispatch = dispatchCommand;