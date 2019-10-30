const pjsonPath = process.cwd() + "/package.json";
let angela = {};
try {
  angela = require(pjsonPath).angela;
} catch (ex) {}

isValidAngelaProject = () => (angela.active ? true : false);

initProjectProps = PROJECT_NAME => {
  var pjson = require(pjsonPath);
  pjson.angela = {
    projectName: PROJECT_NAME,
    date: new Date(),
    active: true
  };
  fs.writeFileSync(pjsonPath, JSON.stringify(pjson, null, 2));
};

getTimeOfCreation = () => {
  isValidAngelaProject() ? angela.date : "Not a valid Angela.js project";
};

getProjectName = () => {
  isValidAngelaProject() ? angela.projectName : "Not a valid Angela.js project";
};

module.exports.isValidAngelaProject = isValidAngelaProject;
module.exports.ivap = isValidAngelaProject;
module.exports.initProjectPros = initProjectProps;
