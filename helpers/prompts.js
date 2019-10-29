const { prompt, Select } = require("enquirer");

async function input(message) {
  const response = await prompt({
    type: "input",
    name: "result",
    message: message
  });

  return response.result;
}

async function pickOne(message, arr) {
  // let response = "";
  let result = await new Select({
    name: "result",
    message: message,
    choices: arr
  })
    .run()
    //.then(answer => (response = answer));
    .then(answer => {
      return answer;
    });

  return result;
}
module.exports.input = input;
module.exports.pickOne = pickOne;
