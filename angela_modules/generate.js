//  Generate module

function handle(args){
	console.log(`Handled ${args}`);
}

module.exports.handle = handle;

// if(hasNextArg()){
// 		if(args[argsExecuted] === '--help'){
// 			helpForGenerate();
// 		}else if (args[argsExecuted] === 'controller'){
// 			//TODO - Add help for generate controller

// 			if(hasNextArg()){
// 				//TODO - Verify if current dir is a valid Angela.js project
// 				generateController(args[argsExecuted]);
// 			}
// 		}else if (args[argsExecuted] === 'model'){
// 			//TODO - Add help for generate model

// 			if(hasNextArg()){
// 				//TODO - Verify if current dir is a valid Angela.js project
// 				generateModel(args[argsExecuted]);
// 			}
// 		}else if (args[argsExecuted] === 'route'){
// 			//TODO - Add help for generate route

// 			if(hasNextArg()){
// 				//TODO - Verify if current dir is a valid Angela.js project
// 				generateRoute(args[argsExecuted]);
// 			}
// 		}else if (args[argsExecuted] === 'middleware'){
// 			//TODO - Add help for generate middleware

// 			if(hasNextArg()){
// 				//TODO - Verify if current dir is a valid Angela.js project
// 				generateMiddleware(args[argsExecuted]);
// 			}
// 		}else {
// 			console.log(`${signature} Unknown command`);
// 		}
// 	}else{
// 		console.log(`${missingArgumentsMessage} ${args[argsExecuted-1]}`);
// 	}

