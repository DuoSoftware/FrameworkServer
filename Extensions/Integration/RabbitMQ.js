function Extension() {
	function saveObject (object, parameters){

	}

	function getObject (parameters){

	}

	function start (parameters){
		console.log("Started!!!");
	}

	function stop (){

	}

	return {
		start: function(parameters){start(parameters)},
		stop: function(){stop()},
		getObject: function(){getObject (parameters)},
		saveObject: function(){saveObject (object, parameters)}
	}
};


exports.newInstance = function(){ 
	var extension = new Extension();
	return extension;
};