var pjsonPath = process.cwd() + "/package.json";
const path = require('path');
const notValid = "Not a valid Angela.js Project";
const chalk = require("chalk");
const fs = require("fs");
var projName;
let angela = {};

log = message => {
  const signature = chalk.magenta("Angela.js: ");
  console.log(signature + message);
};

try {
  angela = require(pjsonPath).angela;
} catch (ex) {}

isValidAngelaProject = () => (angela.active ? true : false);

setProjectName = PROJECT_NAME => {
  projName = PROJECT_NAME;
};

initProjectProps = PROJECT_NAME => {
  angela = {
    projectName: PROJECT_NAME,
    date: new Date(),
    active: true,
    routes: [],
    controllers: [],
    models: []
  };
  updateProps(true);
};

updateProps = (isFirstUpdate, cb) => {
  let pjson;
  try {
    if (isFirstUpdate)
      pjsonPath = process.cwd() + "/" + projName + "/package.json";
    pjson = require(pjsonPath);
    console.log(pjson.angela);
  } catch (ex) {
    log(ex);
  }

  pjson.angela = angela;
  //fs.writeFileSync(pjsonPath, JSON.stringify(pjson, null, 2));

  const stream = fs.createWriteStream(pjsonPath);
  stream.once("open", function(fd) {
    stream.write(JSON.stringify(pjson, null, 2));
    stream.end();
    if (cb) cb();
  });

  log("Updated Angela Properties");
};

getTimeOfCreation = () => angela.date;
getProjectName = () => (angela.projectName ? angela.projectName : projName);
getRoutes = () => (angela.routes ? angela.routes : []);
getControllers = () => (angela.controllers ? angela.controllers : []);
getModels = () => (angela.models ? angela.models : []);

getProjectAbsolutePath = () => {
  //TODO - This needs urgent fixing
  //It will be working with a workaround for now
  let absolutePath = "";
  if (isValidAngelaProject()) {
    //log("IS A VALID PROJECT");
    absolutePath = process.cwd();
    if (path.basename(absolutePath) !== getProjectName()) absolutePath += `/${getProjectName()}`
    log("papIn: " + absolutePath);
    log("pnIn: " + getProjectName());
    return absolutePath;
  }
  absolutePath = process.cwd() + "/" + projName
  //log("IS NOT A VALID");
  log("papOut: " + absolutePath);
  log("pnOut: " + projName);
  return absolutePath;
};

pushRoute = (name, cb) => pushItem("routes", name, cb);
pushController = (name, cb) => pushItem("controllers", name, cb);
pushModel = (name, cb) => pushItem("models", name, cb);

removeModel = name => removeItem("models", name);
removeController = name => removeItem("controllers", name);
removeRoute = name => removeItem("routes", name);

/* Operations with Arrays*/
pushItem = (arrName, value, callback) => {
  arrName = arrName.toLowerCase();
  value = value.toLowerCase();
  if (angela[arrName])
    if (!angela[arrName].includes(value)) angela[arrName].push(value);
    else log(`File in ${arrName} with name ${value} already exists`);
  else angela[arrName] = [value];
  log(angela[arrName]);
  updateProps(false, callback);
};

removeItem = (arrName, value) => {
  arrName = arrName.toLowerCase();
  value = value.toLowerCase();
  if (angela[arrName])
    if (angela[arrName].includes(value)) {
      angela[arrName] = angela[arrName].filter(e => e !== value);
      updateProps();
    } else log(`File in ${arrName} with name ${value} does not exist`);
};

itemExists = (arrName, value) => {
  arrName = arrName.toLowerCase();
  value = value.toLowerCase();
  if (!angela[arrName]) return false;
  if (!angela[arrName].includes(value)) return false;
  return true;
};
/* End Operations with Arrays*/

module.exports.isValidAngelaProject = isValidAngelaProject;
module.exports.ivap = isValidAngelaProject;
module.exports.initProjectProps = initProjectProps;
module.exports.getProjectAbsolutePath = getProjectAbsolutePath;
module.exports.setProjectName = setProjectName;
module.exports.getProjectName = getProjectName;
module.exports.getRoutes = getRoutes;
module.exports.pushRoute = pushRoute;
module.exports.removeRoute = removeRoute;
module.exports.getModels = getModels;
module.exports.pushModel = pushModel;
module.exports.removeModel = removeModel;
module.exports.getControllers = getControllers;
module.exports.pushController = pushController;
module.exports.removeController = removeController;