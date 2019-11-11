const chalk = require("chalk");
const fs = require("fs");
const { ivap, getProjectAbsolutePath } = require("../config/angelaProperties");

log = message => {
  const signature = chalk.magenta("Angela.js: ");
  console.log(signature + message);
};

generateFile = (relativePath, content, wantLog, onFinish) => {
  const fullPath = `${getProjectAbsolutePath()}/${relativePath}`;
  console.log(fullPath);
  const stream = fs.createWriteStream(fullPath);
  stream.once("open", function(fd) {
    stream.write(content);
    stream.end();
    if (wantLog) log(`Generated file ${relativePath}`);
    if (onFinish) onFinish();
  });
};

module.exports.log = log;
module.exports.generateFile = generateFile;
