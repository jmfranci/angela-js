const chalk = require("chalk");

const modelArr = [
  ["name", "str", "req"],
  ["mar", "string"],
  ["phone", "number"],
  ["dob", "date", "req"]
];

const aString = ["string", "str", "char"];
const aNumber = [
  "num",
  "number",
  "real",
  "decimal",
  "int",
  "integer",
  "double",
  "float"
];
const aDate = ["date", "datetime"];
const aBool = ["boolean", "bool"];

const model = {};

let builder = "";

for (i = 0; i < modelArr.length; ++i) {
  name = modelArr[i][0].toLowerCase();
  dataType = modelArr[i][1].toLowerCase();
  required = false;
  if (modelArr[i][2]) required = true;

  if (aString.includes(dataType)) dataType = "String";
  else if (aNumber.includes(dataType)) dataType = "Number";
  else if (aDate.includes(dataType)) dataType = "Date";
  else if (aBool.includes(dataType)) dataType = "Boolean";
  else {
    console.log("Data type not recognized");
    continue;
  }

  builder += `\t${chalk.blue(name)}: {type: ${chalk.green(
    dataType
  )}, required: ${chalk.red(required)}}\n`;
}

console.log(`{
${builder}}`);
