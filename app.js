var endpointManager = require("./Control/EndpointManager.js")
var logger = require ('./Core/Logger.js');

console.log("")
console.log("")
console.log("")

console.log("(               (       ")
console.log(")\\ )  (  (      )\\ )")
console.log("(()/(  )\\))(   '(()/(   ")
console.log("/(_))((_)()\\ )  /(_)) ")
console.log("(_))_|_(())\\_)()(_))   ")
console.log("| |_  \\ \\((_)/ // __|  ")
console.log("| __|  \\ \\/\\/ / \\__ \\  ")
console.log("|_|     \\_/\\_/  |___/  ")

console.log("")
console.log("")
console.log("")

process.on('uncaughtException',function(err){
  logger.log("UNCAUGHT EXCEPTION")
  logger.log(err.stack);
})

endpointManager.start();


