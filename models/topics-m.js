const connection = require("../db/connection");

const selectAllTopics = () => {
  return connection("topics")
    .select("*")
    .then(topics => {
      return topics;
    });
};

module.exports = selectAllTopics;
