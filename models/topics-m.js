const connection = require("../db/connection");

const selectAllTopics = () => {
  console.log("in the model");
  return connection("topics")
    .select("*")
    .then(topics => {
      return topics;
    });
};

module.exports = selectAllTopics;
