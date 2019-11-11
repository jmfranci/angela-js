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

log(`This is the list ${routesList}`);

getRouteImportStatement = route => {
  return `const ${route} = require('${routesPath}/${route}');\n`;
};

getRouteUseStatement = route => {
  return `app.use('${routePrefix}/${route}', ${route});\n`;
};

refreshRoutes = () => {
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
  generateFile(filepath, finalContent);
};

module.exports.refreshRoutes = refreshRoutes;
