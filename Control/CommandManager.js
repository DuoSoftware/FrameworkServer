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
				break;
			case "event-unsubscribe":
				break;

		}

	}
}

exports.dispatch = dispatchCommand;