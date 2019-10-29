#!/usr/bin/env node
const fs = require("fs");
const npmRun = require("npm-run");
const npm = require("npm");
var exec = require("child_process").exec;
const prompts = require("../helpers/prompts");
// **** Folders' names ******
const CONTROLLERS = "controllers";
const MODELS = "models";
const ROUTES = "routes";
const STARTUP = "startup";
const CONFIG = "config";
const MIDDLEWARE = "middleware";
const TESTS = "tests";
let PROJECT_NAME = "";
// **** End Folders' names ******
const STD_DEPENDENCIES = ["express", "joi", "mongoose"];

async function handle(callers, args) {
  console.log(`Handled ${args} and ${callers}`);

  //TODO - Check if args' length is different than 0
  if (args.length === 0)
    PROJECT_NAME = await prompts.input("Enter project name");
  else PROJECT_NAME = args[0];

  initAngelaProject(PROJECT_NAME);
}

execInMainDir = (command, callback) => {
  const absoluteProjPath = process.cwd() + "/" + PROJECT_NAME;
  const FULL_COMMAND = `(cd ${absoluteProjPath} && ${command})`;
  //console.log(`Executed command: ${FULL_COMMAND}`);
  child = exec(FULL_COMMAND, function(error, stdout, stderr) {
    if (error) {
      console.log(error);
    } else {
      console.log(stdout);
    }
    callback(error, stdout, stderr);
  });
};

async function initAngelaProject(name) {
  //PROJECT_NAME = name;

  console.log(`Initiating new Angela.js project named ${PROJECT_NAME}`);
  fs.mkdir(PROJECT_NAME, function() {
    execInMainDir("npm init --yes", (err, stdout, stderr) => {
      fs.mkdir(`./${PROJECT_NAME}/${CONTROLLERS}`, function() {});

      fs.mkdir(`./${PROJECT_NAME}/${MODELS}`, function() {});

      fs.mkdir(`./${PROJECT_NAME}/${ROUTES}`, function() {});

      fs.mkdir(`./${PROJECT_NAME}/${STARTUP}`, function() {});

      fs.mkdir(`./${PROJECT_NAME}/${CONFIG}`, function() {});

      fs.mkdir(`./${PROJECT_NAME}/${MIDDLEWARE}`, function() {});

      var stream = fs.createWriteStream(`./${PROJECT_NAME}/index.js`);
      stream.once("open", function(fd) {
        stream.write("My first row\n");
        stream.write("My second row\n");
        stream.end();
      });

      installDependencies(STD_DEPENDENCIES);
    });

    // Create .gitignore file
  });
}

async function installDependencies(arr) {
  if (arr.length == 0) return;
  listOfDependencies = "";
  arr.map(dep => {
    listOfDependencies = listOfDependencies + dep + " ";
  });
  execInMainDir(`npm i ${listOfDependencies}`, err => {
    if (!err) {
      console.log("Standard dependencies installed successfully");
      console.log(`Created project ${PROJECT_NAME}`);
      var pjson = require(process.cwd() + "/" + PROJECT_NAME + "/package.json");
      console.log(pjson.version);
      process.exit(0);
    }
  });
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
