const chalk = require("chalk");
const fs = require("fs");
const exec = require("child_process").exec;
const {
  ivap,
  getProjectAbsolutePath,
  getProjectName
} = require("../config/angelaProperties");

log = message => {
  const signature = chalk.magenta("Angela.js: ");
  console.log(signature + message);
};

generateFile = (relativePath, content, wantLog, onFinish) => {
  const fullPath = `${getProjectAbsolutePath()}/${relativePath}`;
  //console.log(fullPath);
  const stream = fs.createWriteStream(fullPath);
  stream.once("open", function(fd) {
    stream.write(content);
    stream.end();
    if (wantLog) log(`Generated file ${chalk.cyan(relativePath)}`);
    if (onFinish) onFinish();
  });
};

execInMainDir = (command, callback) => {
  //const absoluteProjPath = process.cwd() + "/" + getProjectName();
  absoluteProjPath = getProjectAbsolutePath();
  const FULL_COMMAND = `(cd ${absoluteProjPath} && ${command})`;
  //console.log(`Executed command: ${FULL_COMMAND}`);
  child = exec(FULL_COMMAND, function(error, stdout, stderr) {
    if (error) {
      log(error);
    } else {
      log(stdout);
    }
    callback(error, stdout, stderr);
  });
};

module.exports.log = log;
module.exports.generateFile = generateFile;
module.exports.execInMainDir = execInMainDir;
