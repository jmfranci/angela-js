#!/usr/bin/env node
const fs = require('fs');
const npmRun = require('npm-run');
const generate = require('./angela_modules/generate'); 
const destroy = require('./angela_modules/destroy'); 
const init = require('./angela_modules/init');

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
const signature = "Angela.js:";
const missingArgumentsMessage = "Add more arguments or add '--help' to learn more about the usage of";
const templateHelpMessage = "This is the help for";
//***** End of Pre-defined feedback messages *******

const callers = [];

if (args.length === 0){
	console.log(`${signature} Insert one or more arguments `);
}

if (args[0] === 'init'){
	callers.push(args.shift());
	init.handle(callers, args);
}else if (args[0] === 'generate' || args[0] === 'g'){
	callers.push(args.shift());
	generate.handle(callers, args);
}else if (args[0] === 'destroy' || args[0] === 'g'){
	destroy.handle(callers, args[0]);
}else if (args[0] === 'serve' || args[0] === 's'){
	runApplication();
}else{
	console.log(`${signature} Unknown command`);
}

// Help for command (angela init --help)
function helpForInit(){
	console.log(`${templateHelpMessage} ${args[argsExecuted-1]}`);
}

function helpForGenerate(){
	console.log(`${templateHelpMessage} ${args[argsExecuted-1]}`);
}

// ***************** Functions for validation *********************

function isWordReserved(word){
	const dataTypes = ['string','int','undefined'];
	const moduleNames = ['module', 'controller','model','view','route','config'];
}

// ***************** Functions for Executing the App *********************
function runApplication(){
	console.log("Running Application");
}

