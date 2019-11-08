#!/usr/bin/env node
const fs = require("fs");
const npmRun = require("npm-run");
const npm = require("npm");
var exec = require("child_process").exec;
const prompts = require("../helpers/prompts");
const {log} = require("../helpers/core");

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
//const STD_DEPENDENCIES = ["express", "joi", "mongoose"];
const STD_DEPENDENCIES = [];
//Functions from Angela Properties Modules
const { ivap, initProjectProps } = require("../config/angelaProperties");

async function handle(callers, args) {
  log(`Handled ${args} and ${callers}`);

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

  log(`Initiating new Angela.js project named ${PROJECT_NAME}`);
  generateFolderStructure(() => installDependencies());
  //initGitRepo();
  generateGitIgnore();
  generateReadMe();
  // TODO - Create ReadMe file
}

generateFolderStructure = (onFinish) => {
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

      onFinish();
    });
})
};

async function installDependencies() {
  const arr = STD_DEPENDENCIES;
  
  if (arr.length == 0) return;
  listOfDependencies = "";
  arr.map(dep => {
    listOfDependencies = listOfDependencies + dep + " ";
  });
  execInMainDir(`npm i ${listOfDependencies}`, err => {
    if (!err) {
      pjsonPath = process.cwd() + "/" + PROJECT_NAME + "/package.json";
      log("Standard dependencies installed successfully");
      log(`Created project ${PROJECT_NAME}`);
      if (!ivap) initAngelaProject(PROJECT_NAME);
      // TODO - Run git init

      process.exit(0);
    }
  });
}

initGitRepo = () => {
  log(`Initiating Git repo`);
  execInMainDir(`git init`, err => {

  });
}

generateGitIgnore = () => {
	var stream = fs.createWriteStream(process.cwd() + "/" + PROJECT_NAME + "/.gitignore");
	stream.once('open', function(fd) {
		stream.write("node_modules/");
		stream.end();
	});
	log(`Generated .gitignore file`);
}

generateReadMe = () => {
  var stream = fs.createWriteStream(process.cwd() + "/" + PROJECT_NAME + "/.README.md");
	stream.once('open', function(fd) {
    stream.write(`# ${PROJECT_NAME}
      This project was entirely developed using the framework Angela.js. 
      For running this project you'll only need Node/npm installed
      However, for your convinience, it is advised that you install Angela.js at ....................

    ## Installation Steps

    ## Running the app

    ## Running tests

    # REST API
      The REST API to the ${PROJECT_NAME} app is described below

    ## Request 

    `);
		stream.end();
	});
	log(`Generated .gitignore file`);
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
