function authenticate(data){
	
	var authData;

	//var authData = {accounts:[{name:"RabbitMQ",settings:{userName:"supun", password:"supun", queueName:"queue." + data.userName, host: "192.168.1.194", port :"5672"}}], username:"test"};
	
	switch(data.userName){
		case "user1":
			authData = {
				username:"user1", 
				attributes:
				{
					accounts:[{name:"RabbitMQ",settings:{userName:"supun", password:"supun", queueName:"queue." + data.userName, host: "192.168.1.194", port :"5672"}}],
					resources:[{type:"agent", attributes:
						[
							{category:"language", values:[{key:"sinhala", value:80},  {key:"english", value:100}]}
						]}],
					states:{
						agentState:"idle", 
						agentMode:"inbound",
						resourceState:"available"
					},
					stateGroups:[
						{name:"agents", subGroupFields:["initialStates.agentState"]},
						{name:"allUsers"}
					]
				}
			};
			break;
		case "user2":
			authData = {
				username:"user2", 
				attributes:
				{
					accounts:[{name:"RabbitMQ",settings:{userName:"supun", password:"supun", queueName:"queue." + data.userName, host: "192.168.1.194", port :"5672"}}],
					resources:[{type:"agent", attributes:
						[
							{category:"language", values:[{key:"sinhala", value:80},  {key:"english", value:100}]}
						]}],
					states:{
						agentState:"idle", 
						agentMode:"inbound",
						resourceState:"available"
					},
					stateGroups:[
						{name:"agents", subGroupFields:["initialStates.agentState"]},
						{name:"allUsers"}
					]
				}
			};
			break;
		case "user3":
			authData = {
				username:"user3", 
				attributes:
				{
					accounts:[{name:"RabbitMQ",settings:{userName:"supun", password:"supun", queueName:"queue." + data.userName, host: "192.168.1.194", port :"5672"}}],
					resources:[{type:"agent", attributes:
						[
							{category:"language", values:[{key:"sinhala", value:80},  {key:"english", value:100}]}
						]}],
					states:{
						agentState:"idle", 
						agentMode:"inbound",
						resourceState:"available"
					},
					stateGroups:[
						{name:"agents", subGroupFields:["initialStates.agentState"]},
						{name:"allUsers"}
					]
				}
			};
			break;
		default:
			authData = {accounts:[], username:"test"};
			break;
	}
	
	return authData;
}


exports.authenticate = authenticate