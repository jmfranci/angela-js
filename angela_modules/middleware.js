const fs = require('fs');
const npmRun = require('npm-run');

//***** Pre-defined feedback messages *******
const signature = "Angela.js:";
const missingArgumentsMessage = "Add more arguments or add '--help' to learn more about the usage of";
const templateHelpMessage = "This is the help for";
//***** End of Pre-defined feedback messages *******

const MIDDLEWARES = "middlewares";

function handle(callers, args){
	
}

function generate(args){
	console.log(`Generating controller named ${args[0]}`);
	generateMiddleware(args[0]);

}

function destroy(args){

}

function generate(name){
	var stream = fs.createWriteStream(`./${MIDDLEWARES}/${name}.js`);
	stream.once('open', function(fd) {
		stream.write("//Customize this middleware\n");
	 	stream.write("module.exports = function (req, res, next) { \n");
	 	stream.write("\tnext(ex);\n");
		stream.write("}");
		stream.end();
	});
	console.log(`Generating middleware named ${name}`);
}

module.exports.generate = generate;
module.exports.destroy = destroy;
module.exports.handle = handle;