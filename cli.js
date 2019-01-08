#!/usr/bin/env node
const fs = require('fs');
const npmRun = require('npm-run');

// **** Folders' names ******
const CONTROLLERS = "controllers";
const MODELS = "models";
const ROUTES = "routes";
const STARTUP = "startup";
const CONFIG = "config";
const MIDDLEWARE = "middleware";
const TESTS = "tests";
// **** End Folders' names ******

// Grab provided args.
// Arguments are stored in an array called args
const[,, ...args] = process.argv;


//***** Pre-defined feedback messages *******
const signature = "Angela.js:";
const missingArgumentsMessage = "Add more arguments or add '--help' to learn more about the usage of";
const templateHelpMessage = "This is the help for";
//***** End of Pre-defined feedback messages *******


//Print hello world provided args.
//console.log(`Hello World ${args}`);
sizeOfArguments = args.length;
argsExecuted = 0;

if (sizeOfArguments === 0){
	console.log(`${signature} Insert one or more arguments `);
}

if (args[argsExecuted] === 'init'){
	if(hasNextArg()){
		if(args[argsExecuted] === '--help'){
			helpForInit();
		}else{
			// Create project with designated name
			initAngelaProject(args[argsExecuted]);
		}
	}else{
		console.log(`${missingArgumentsMessage} ${args[argsExecuted-1]}`);
	}
}else if (args[argsExecuted] === 'generate' || args[0] === 'g'){
	if(hasNextArg()){
		if(args[argsExecuted] === '--help'){
			helpForGenerate();
		}else if (args[argsExecuted] === 'controller'){
			//TODO - Add help for generate controller

			if(hasNextArg()){
				//TODO - Verify if current dir is a valid Angela.js project
				generateController(args[argsExecuted]);
			}
		}else if (args[argsExecuted] === 'model'){
			//TODO - Add help for generate model

			if(hasNextArg()){
				//TODO - Verify if current dir is a valid Angela.js project
				generateModel(args[argsExecuted]);
			}
		}else if (args[argsExecuted] === 'route'){
			//TODO - Add help for generate route

			if(hasNextArg()){
				//TODO - Verify if current dir is a valid Angela.js project
				generateRoute(args[argsExecuted]);
			}
		}else if (args[argsExecuted] === 'middleware'){
			//TODO - Add help for generate middleware

			if(hasNextArg()){
				//TODO - Verify if current dir is a valid Angela.js project
				generateMiddleware(args[argsExecuted]);
			}
		}else {
			console.log(`${signature} Unknown command`);
		}
	}else{
		console.log(`${missingArgumentsMessage} ${args[argsExecuted-1]}`);
	}
}else if (args[argsExecuted] === 'serve' || args[0] === 's'){
	runApplication();
}else{
	console.log(`${signature} Unknown command`);
}

function hasNextArg(){
	argsExecuted++;
	if (sizeOfArguments === argsExecuted){
		return false;
	}
	return true;
}


// ****************** Functions for creation ***************************
async function initAngelaProject(name){
	console.log(`Initiating new Angela.js project named ${name}`);

	fs.mkdir(name, function(){
		npmRun.exec('npm init', {cwd: `./${name}`}, function (err, stdout, stderr) {
			if (stderr){
				console.log('An error occurred while initiating the project. Make sure you have Node Package Manager(NPM) installed');
				console.log(stderr);
			}
			//console.log(stdout)
		});

		var stream = fs.createWriteStream(`./${name}/index.js`);
			stream.once('open', function(fd) {
		  	stream.write("My first row\n");
		  	stream.write("My second row\n");
		  	stream.end();
		});

		fs.mkdir(`./${name}/${CONTROLLERS}`, function(){

		});

		fs.mkdir(`./${name}/${MODELS}`, function(){

		});

		fs.mkdir(`./${name}/${ROUTES}`, function(){

		});

		fs.mkdir(`./${name}/${STARTUP}`, function(){

		});

		fs.mkdir(`./${name}/${CONFIG}`, function(){

		});

		fs.mkdir(`./${name}/${MIDDLEWARE}`, function(){

		});


		console.log(`Created project ${name}`);
		process.exit(0);

	});


	// Create folder named 'name'

	//Create new node.js project

	/*Create the following folders:
		* Routes
		* Models
		* Controllers
		* Startup
		* Middleware
		* Config
	*/

}

function generateController(name){
	console.log(`Generating controller named ${name}`);
}

function generateModel(name){
	var stream = fs.createWriteStream('./model/' + name + '.js');
	stream.once('open', function(fd) {
		stream.write("//Customize this model\n\n");
	 	stream.write("const mongoose = require('mongoose');\n");
	 	stream.write("const Joi = require('joi');\n\n");
	 	stream.write(`const ${name}Schema = new mongoose.Schema({\n`);
	 	stream.write("\n");
	 	stream.write("});\n\n");
	 	stream.write(`const ${name} = mongoose.model(\'${name}\', genreSchema);\n\n`);
	 	stream.write(`function validate${name}(${name}) {\n`);
	 	stream.write("\tconst schema = {\n\n");
	 	stream.write("\t};\n");
	 	stream.write(`\treturn Joi.validate(${name}, schema);\n`);
	 	stream.write("}\n\n");


	 	stream.write(`module.exports.validate${name} = validate${name};\n`);
	 	stream.write(`module.exports.${name} = ${name};\n`);
	 	stream.write(`module.exports.${name}Schema = ${name}Schema;\n`);
		stream.end();
	});

	console.log(`Generating model named ${name}`);
}

function generateRoute(name){
	var stream = fs.createWriteStream(name + ".js");
	stream.once('open', function(fd) {
		stream.write("//Customize this route\n");
	 	stream.write("const express = require(\'express\');\n");
	 	stream.write("const router = express.Router();\n\n");
		
		//Template for get all request
		stream.write("router.get('/', (req,res) => {\n");
		stream.write(`\tres.status(200).send(\'Get ${name} \');\n`);
		stream.write("});\n\n");

		//Template for get one request
		stream.write("router.get('/:id', (req,res) => {\n");
		stream.write(`\tres.status(200).send(\`Get record with id \$\{req.params.id\} from ${name} \`);\n`);
		stream.write("});\n\n");

		//Template for post request
		stream.write("router.post('/', (req, res) => {\n");
		stream.write(`\tres.status(200).send(\'Post ${name} \');\n`);
		stream.write("});\n\n");

		//Template for put request
		stream.write("router.put('/:id', (req,res) => {\n");
		stream.write(`\tres.status(200).send(\`Put/update record with id \$\{req.params.id\} from ${name} \`);\n`);
		stream.write("});\n\n");

		stream.write("router.delete('/:id', (req,res) => {\n");
		stream.write(`\tres.status(200).send(\`Delete record with id \$\{req.params.id\} from ${name} \`);\n`);
		stream.write("});\n\n");

		stream.write("module.exports = router;");
		stream.end();
	});
	console.log(`Generating route named ${name}`);
}

function generateMiddleware(name){
	var stream = fs.createWriteStream(name + ".js");
	stream.once('open', function(fd) {
		stream.write("//Customize this middleware\n");
	 	stream.write("module.exports = function (req, res, next) { \n");
	 	stream.write("\tnext(ex);\n");
		stream.write("}");
		stream.end();
	});
	console.log(`Generating middleware named ${name}`);
}

//***************** Functions for helping the user *********************

// Help for command (angela init --help)
function helpForInit(){
	console.log(`${templateHelpMessage} ${args[argsExecuted-1]}`);
}

function helpForGenerate(){
	console.log(`${templateHelpMessage} ${args[argsExecuted-1]}`);
}

// ***************** Functions for validation *********************

function isWordReserved(word){
	const dataTypes = ['string','int','undefined'];
	const moduleNames = ['module', 'controller','model','view','route','config'];
}

// ***************** Functions for Executing the App *********************
function runApplication(){
	console.log("Running Application");
}

