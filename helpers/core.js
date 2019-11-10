const chalk = require('chalk');

log = (message) => {
    const signature = chalk.magenta("Angela.js: ");
    console.log (signature + message);
}
module.exports.log = log;