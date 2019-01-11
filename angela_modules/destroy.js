//***** Pre-defined feedback messages *******
const signature = "Angela.js:";
const missingArgumentsMessage = "Add more arguments or add '--help' to learn more about the usage of";
const templateHelpMessage = "This is the help for";
//***** End of Pre-defined feedback messages *******

function handle(callers, args){
	console.log(`Handled ${args}`);
}

module.exports.handle = handle;

