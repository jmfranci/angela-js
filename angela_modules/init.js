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

async function handle(args){
	console.log(`Handled ${args}`);
	initAngelaProject(args[0]);
}

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