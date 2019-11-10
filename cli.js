#!/usr/bin/env node
const fs = require('fs');
const npmRun = require('npm-run');
const generate = require('./angela_modules/generate'); 
const destroy = require('./angela_modules/destroy'); 
const init = require('./angela_modules/init');
const chalk = require('chalk');
const {log} = require('./helpers/core');

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
const signature = chalk.magenta("Angela.js:");
const missingArgumentsMsg = "Add more arguments or add '--help' to learn more about the usage of";
const templateHelpMsg = "This is the help for";

//***** End of Pre-defined feedback messages *******
const generateVariations = ['generate','g','create'];
const destroyVariations = ['destroy', 'd', 'delete'];
const runVariations = ['serve', 's', 'run'];
const callers = [];

if (args.length === 0){
	log(`Insert one or more arguments `);
}

if (args[0] === 'init'){
	callers.push(args.shift());
	init.handle(callers, args);
}else if (generateVariations.includes(args[0])){
	callers.push(args.shift());
	generate.handle(callers, args);
}else if (destroyVariations.includes(args[0])){
	destroy.handle(callers, args[0]);
}else if (runVariations.includes(args[0])){
	runApplication();
}else{
	log(`Unknown command`);
}

// Help for command (angela init --help)
function helpForInit(){
	log(`${templateHelpMsg} ${args[argsExecuted-1]}`);
}

function helpForGenerate(){
	log(`${templateHelpMsg} ${args[argsExecuted-1]}`);
}

// ***************** Functions for validation *********************
function isWordReserved(word){
	const dataTypes = ['string','int','undefined'];
	const moduleNames = ['module', 'controller','model','view','route','config'];
}

// ***************** Functions for Executing the App *********************
function runApplication(){
	log("Running Application");
}

