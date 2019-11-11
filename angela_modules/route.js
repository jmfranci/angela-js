const fs = require("fs");
const npmRun = require("npm-run");
const { pushRoute } = require("../config/angelaProperties");
const { refreshRoutes } = require("../angela_modules/templates/routes");
const { log, generateFile } = require("../helpers/core");
const { getRouteTemplate } = require("./templates/route");
//***** Pre-defined feedback messages *******
const missingArgumentsMessage =
  "Add more arguments or add '--help' to learn more about the usage of";
const templateHelpMessage = "This is the help for";
//***** End of Pre-defined feedback messages *******

const ROUTES = "routes";

function handle(callers, args) {}

// function generate(args) {
//   generateRoute(args[0]);
// }

function destroy(args) {
  // This function is responsible for removing the files
}

function generate(name) {
  generateFile(`${ROUTES}/${name}.js`, getRouteTemplate(name), true);
  pushRoute(name, refreshRoutes);
}

//TODO - Generate async routes

module.exports.generate = generate;
module.exports.destroy = destroy;
module.exports.handle = handle;
