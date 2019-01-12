//***** Pre-defined feedback messages *******
const signature = "Angela.js:";
const missingArgumentsMessage = "Add more arguments or add '--help' to learn more about the usage of";
const templateHelpMessage = "This is the help for";
//***** End of Pre-defined feedback messages *******

const ROUTES = "routes";

function handle(callers, args){
	
}

function generate(args){
	generateRoute(args[0]);
}

function destroy(args){

}

function generate(name){
	var stream = fs.createWriteStream(`./${ROUTES}/${name}.js`);
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
	console.log(`Generated route named ${name}`);
}

module.exports.generate = generate;
module.exports.destroy = destroy;
module.exports.handle = handle;