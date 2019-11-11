//***** Pre-defined feedback messages *******
const signature = "Angela.js:";
const missingArgumentsMessage =
  "Add more arguments or add '--help' to learn more about the usage of";
const templateHelpMessage = "This is the help for";
//***** End of Pre-defined feedback messages *******

//  Generate module
const generables = ["--help", "controller", "model", "route", "middleware"];
const controller = require("./controller");
const model = require("./model");
const route = require("./route");
const middleware = require("./middleware");
const help = require("./help");
const prompts = require("../helpers/prompts");

async function handle(callers, args) {
  if (args.length === 0) {
    const { ivap } = require("../config/angelaProperties");

    //console.log(ivap());
    const generable = await prompts.pickOne(
      "What do you want to generate",
      generables
    );
    args.push(generable);
  }

  if (args[0] === "--help") {
    //TODO - Move this to help module
    helpForGenerate();
  } else if (args[0] === "controller") {
    //TODO - Add help for generate controller
    if (args.length != 0) {
      //TODO - Verify if current dir is a valid Angela.js project
      callers.push(args.shift());
      controller.generate(args);
    }
  } else if (args[0] === "model") {
    //TODO - Add help for generate model
    //TODO - Verify if current dir is a valid Angela.js project
    callers.push(args.shift());

    model.generate(args);
  } else if (args[0] === "route") {
    //TODO - Add help for generate route

    if (args.length != 0) {
      //TODO - Verify if current dir is a valid Angela.js project
      callers.push(args.shift());
      route.generate(args[0]);
    }
  } else if (args[0] === "middleware") {
    //TODO - Add help for generate middleware

    if (args.length != 0) {
      //TODO - Verify if current dir is a valid Angela.js project
      callers.push(args.shift());
      middleware.generate(args);
    }
  } else {
    console.log(`${signature} Unknown command ${args[0]}`);
  }
}

module.exports.handle = handle;
