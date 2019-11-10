const fs = require("fs");
const npmRun = require("npm-run");

//***** Pre-defined feedback messages *******
const signature = "Angela.js:";
const missingArgumentsMessage =
  "Add more arguments or add '--help' to learn more about the usage of";
const templateHelpMessage = "This is the help for";
//***** End of Pre-defined feedback messages *******
const prompts = require("../helpers/prompts");
const MODELS = "models";

function handle(callers, args) {}

async function generate(args) {
  const modelName = args[0];
  console.log(args);
  if (args.length === 0) {
    const modelName = await prompts.input("Enter name of the model");
    //    args.push(modelName);
  }
  args.shift();
  generateModel(modelName, args);
}

function destroy(args) {}

function generate(name, args) {
  console.log(args);
  //console.log(args.length);
  var stream = fs.createWriteStream(`./${MODELS}/${name}.js`);
  stream.once("open", function(fd) {
    stream.write("//Customize this model\n\n");
    stream.write("const mongoose = require('mongoose');\n");
    stream.write("const Joi = require('joi');\n\n");
    stream.write(`const ${name}Schema = new mongoose.Schema({\n`);
    stream.write("\n");
    stream.write("});\n\n");
    stream.write(
      `const ${name} = mongoose.model(\'${name}\', genreSchema);\n\n`
    );
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

module.exports.generate = generate;
module.exports.destroy = destroy;
module.exports.handle = handle;
