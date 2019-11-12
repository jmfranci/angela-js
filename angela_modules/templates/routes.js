const fs = require("fs");
const { getRoutes } = require("../../config/angelaProperties");
const filepath = "startup/routes.js";
const routesList = getRoutes();
const routesPath = "../routes";
const { log, generateFile } = require("../../helpers/core");

// String that stores the libraries to import
const libs = `const express = require('express');`;
let routeImport = "const home = require('../routes/home');\n";
const mainFunctionExport = "module.exports = function(app)";
const expressJson = `app.use(express.json());`;
const routePrefix = "/api/v1";
let routeUsage = "";
const routeHomeUsage = `app.use('/', home);`;

getRouteImportStatement = route => {
  return `const ${route} = require('${routesPath}/${route}');\n`;
};

getRouteUseStatement = route => {
  return `app.use('${routePrefix}/${route}', ${route});\n`;
};

function getContent() {
  console.log(`Size of the list: ${routesList.length}`);
  routesList.map(route => (routeImport += getRouteImportStatement(route)));
  routesList.map(route => (routeUsage += `\t${getRouteUseStatement(route)}`));

  const finalContent = `
  ${libs}
  ${routeImport}
  ${mainFunctionExport}{
      ${expressJson}
  ${routeUsage}
      ${routeHomeUsage}
  }`;

  return finalContent;
}
//TODO - Solve problem of first pushed route not added to this file
refreshRoutes = () => {
  generateFile(filepath, getContent());
};

module.exports.refreshRoutes = refreshRoutes;
module.exports.getStartupRoutesContent = getContent;
