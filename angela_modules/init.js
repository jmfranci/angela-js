#!/usr/bin/env node
const fs = require("fs");
const npmRun = require("npm-run");
const npm = require("npm");
var exec = require("child_process").exec;
const prompts = require("../helpers/prompts");
const { log, generateFile } = require("../helpers/core");

// **** Folders' names ******
const CONTROLLERS = "controllers";
const MODELS = "models";
const ROUTES = "routes";
const STARTUP = "startup";
const CONFIG = "config";
const MIDDLEWARE = "middleware";
const TESTS = "tests";
let PROJECT_NAME = "";

// **** Templates ******
const { tReadMe } = require("./templates/readme");
const { tIndex } = require("./templates/index");
const { tGitIgnore } = require("./templates/gitignore");
const { tHomeRoute } = require("./templates/homeRoute");

//const STD_DEPENDENCIES = ["express", "joi", "mongoose"];
const STD_DEPENDENCIES = [];
//Functions from Angela Properties Modules
const {
  ivap,
  initProjectProps,
  setProjectName
} = require("../config/angelaProperties");

async function handle(callers, args) {
  log(`Handled ${args} and ${callers}`);

  if (args.length === 0)
    PROJECT_NAME = await prompts.input("Enter project name");
  else PROJECT_NAME = args[0];

  initAngelaProject();
}

async function initAngelaProject() {
  log(`Initiating new Angela.js project named ${PROJECT_NAME}`);
  setProjectName(PROJECT_NAME);
  generateFolderStructure(() => installDependencies());
  //initGitRepo();
  generateFile(".gitignore", tGitIgnore);
  generateFile("README.md", tReadMe, true);
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

generateFolderStructure = onFinish => {
  fs.mkdir(PROJECT_NAME, function() {
    execInMainDir("npm init --yes", (err, stdout, stderr) => {
      fs.mkdir(`./${PROJECT_NAME}/${CONTROLLERS}`, function() {});
      fs.mkdir(`./${PROJECT_NAME}/${MODELS}`, function() {});
      fs.mkdir(`./${PROJECT_NAME}/${ROUTES}`, function() {});
      fs.mkdir(`./${PROJECT_NAME}/${STARTUP}`, function() {});
      fs.mkdir(`./${PROJECT_NAME}/${CONFIG}`, function() {});
      fs.mkdir(`./${PROJECT_NAME}/${MIDDLEWARE}`, function() {});
      generateFile("index.js", tIndex, true);
      generateFile(`${ROUTES}/home.js`, tHomeRoute, true);
      initProjectProps(PROJECT_NAME);
      onFinish();
    });
  });
};

async function installDependencies() {
  if (STD_DEPENDENCIES.length == 0) return;
  listOfDependencies = "";
  STD_DEPENDENCIES.map(dep => {
    listOfDependencies = listOfDependencies + dep + " ";
  });

  // TODO - Add progress bar
  execInMainDir(`npm i ${listOfDependencies}`, err => {
    if (!err) {
      pjsonPath = process.cwd() + "/" + PROJECT_NAME + "/package.json";
      log("Standard dependencies installed successfully");
      log(`Created project ${PROJECT_NAME}`);
      if (!ivap) initAngelaProject(PROJECT_NAME);
      process.exit(0);
    }
  });
}

initGitRepo = () => {
  log(`Initiating Git repo`);
  execInMainDir(`git init`, err => {});
};

module.exports.handle = handle;
