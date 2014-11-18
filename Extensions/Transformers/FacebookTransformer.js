var commandDispatcher  = require("../../Core/CommandDispatcher.js")

function sendLogic(data){
	var transformedData = {};
	
}

function recieveLogic(data){
	var commandData = {to: data.to, from: data.from, message: data.message};
	var command = {type:command, name:chatmessage, data:commandData}

	commandDispatcher.dispatch(command);

}

exports.send = sendLogic
exports.recieve = recieveLogic
