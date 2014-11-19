function startIntegration(accountInfo){

	for(index in accountInfo.accounts){
		var currentAccount = accountInfo.accounts[index];
		var intExtension = require("../Extensions/Integration/" + currentAccount.name + ".js");
		var newInstance = intExtension.newInstance();

		newInstance.start(currentAccount.settings)
	}
}

exports.integrate = startIntegration

