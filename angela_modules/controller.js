const fs = require('fs');
const npmRun = require('npm-run');

//***** Pre-defined feedback messages *******
const signature = "Angela.js:";
const missingArgumentsMessage = "Add more arguments or add '--help' to learn more about the usage of";
const templateHelpMessage = "This is the help for";
//***** End of Pre-defined feedback messages *******

const CONTROLLERS = "controllers";

function handle(callers, args){
	
}

function generate(args){
	console.log(`Generating controller named ${args[0]}`);
	generateController(args[0]);

}

function destroy(args){

}

function generateController(name){
	var stream = fs.createWriteStream(`./${CONTROLLERS}/${name}.js`);
	stream.once('open', function(fd) {
		stream.write("//Customize this controller\n\n");
		stream.end();
	});
}

module.exports.generate = generate;
module.exports.destroy = destroy;
module.exports.handle = handle;