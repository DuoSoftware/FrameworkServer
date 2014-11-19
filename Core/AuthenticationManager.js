function authenticate(data){
	
	var authData = {accounts:[{name:"RabbitMQ",settings:{queueName:"queue." + data.userName, host: "localhost", port :"9999"}}], username:"test"};

	return authData;
}


exports.authenticate = authenticate