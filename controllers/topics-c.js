const selectAllTopics = require("../models/topics-m");

exports.getAllTopics = (req, res, next) => {
  selectAllTopics().then(topics => {
    console.log("in the controller");
  });
};
