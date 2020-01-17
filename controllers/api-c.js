const getApiJSON = require("../endpoints.json");

exports.getApiJSON = (req, res, next) => {
  console.log(getApiJSON);
  res.status(200).send(getApiJSON);
};
