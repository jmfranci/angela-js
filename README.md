# Description

SSH2 client and server modules written in pure JavaScript for [node.js](http://nodejs.org/).

# Table of Contents

* [Requirements](#requirements)
* [Installation](#installation)
* [Create New Angela.js Project](#create-new-angelajs-project)
* [Run project](#run-project)
* [Generate command](#client-examples)
  * [Model](#g-model)
  * [Controller](#g-controller)
  * [Route](#g-route)
* [Destroy command](#destroy)
  * [Model](#d-model)
  * [Controller](#d-controller)
  * [Route](#d-route)
* [Help](#help)
* [Common Mistakes](#server-examples)
* [Licence Information](#license-information)

## Requirements

* [node.js](http://nodejs.org/) -- v5.2.0 or newer

## Installation


If you're installing Angela.js from NPM, you just have to run the following command:

    > npm install angela-js -g
    
If you're installing Angela.js from Github Repo, you just have to run the following commands:

    > git clone https://github.com/jmfranci/angela-js.git
    > cd angela-js
    > npm install
    > npm link

To ensure that Angela.js is correctly installed in your machine, execute the following command to check your Angela.js version 

    > angela --version

## Create New Angela.js Project

To create a new Angela.js project, run the following command:

    > angela init <ProjectName>

*If the project name is not provided, Angela will prompt the user to enter a project name.*
    
After the project is created, the following folder three is available

    <ProjectName>
        ├── config
        ├── controllers
        ├── middleware
        ├── models
        ├── node_modules
        ├── routes
        |   └── home.js  
        ├── startup
        |   └── routes.js                
        ├── .gitignore
        ├── index.js
        ├── package.json
        ├── package-lock.json
        ├── startup
        └── README.md

## Run project
To run your Angela.js project, execute the following command:

    > cd <ProjectName>          #If you're not in the project directory
    > angela run

This should open a connection to the http://localhost:3000.

## Generate command
The generate command is responsible for generating any type of file to an Angela.js project. The generate command can be used with either `angela g` or `angela generate`.

### Model

To generate a model, you write the following:
    
    > angela g model <ModelName>

*If model name is not provided, angela will prompt user to enter model name.*

    > angela g model user

The file is created at ProjectName/models/user.js
```javascript
//Customize this model

const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({

});

const user = mongoose.model('user', genreSchema);

function validateuser(user) {
	const schema = {

	};
	return Joi.validate(user, schema);
}

module.exports.validateuser = validateuser;
module.exports.user = user;
module.exports.userSchema = userSchema;

```

#### Add properties to the model

You can also add properties to your model right from the command line. To do so, you need the following command:

    angela g model user -p name.str.req