



function handle(args){
	console.log(`Handled ${args}`);
}

module.exports.handle = handle;
	// if(hasNextArg()){
	// 	if(args[argsExecuted] === '--help'){
	// 		helpForInit();
	// 	}else{
	// 		// Create project with designated name
	// 		initAngelaProject(args[argsExecuted]);
	// 	}
	// }else{
	// 	console.log(`${missingArgumentsMessage} ${args[argsExecuted-1]}`);
	// }