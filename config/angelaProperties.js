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
  const pjsonPath = process.cwd() + "/package.json";
  angela = require(pjsonPath).angela;
} catch (ex) {}

isValidAngelaProject = () => (angela.active ? true : false);

setProjectName = PROJECT_NAME => {
  projName = PROJECT_NAME;
};

initProjectProps = PROJECT_NAME => {
  projName = PROJECT_NAME;
  const pjsonPath = process.cwd() + "/" + PROJECT_NAME + "/package.json";
  var pjson = require(pjsonPath);
  pjson.angela = {
    projectName: PROJECT_NAME,
    date: new Date(),
    active: true
  };
  try {
    fs.writeFileSync(pjsonPath, JSON.stringify(pjson, null, 2));
  } catch (ex) {
    console.log(ex);
  }
};

getTimeOfCreation = () => {
  isValidAngelaProject() ? angela.date : log(notValid);
};

getProjectName = () => {
  isValidAngelaProject() ? angela.projectName : log(notValid);
};

getProjectAbsolutePath = () => {
  if (isValidAngelaProject()) {
    return process.cwd();
  }
  return process.cwd() + "/" + projName;
};

module.exports.isValidAngelaProject = isValidAngelaProject;
module.exports.ivap = isValidAngelaProject;
module.exports.initProjectProps = initProjectProps;
module.exports.getProjectAbsolutePath = getProjectAbsolutePath;
module.exports.setProjectName = setProjectName;
