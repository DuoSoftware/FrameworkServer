function authenticate(data){
	
	//var authData = {accounts:[{name:"RabbitMQ",settings:{userName:"supun", password:"supun", queueName:"queue." + data.userName, host: "192.168.1.194", port :"5672"}}], username:"test"};
	var authData = {accounts:[], username:"test"};

	return authData;
}


exports.authenticate = authenticate