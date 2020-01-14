const selectAllTopics = require("../models/topics-m");

exports.getAllTopics = (req, res, next) => {
  console.log("in the controller");
  selectAllTopics().then(topics => {
    res.status(200).send({ topics });
  });
};
