const topicsRouter = require("express").Router();
const { getAllTopics } = require("../controllers/topics-c");
const { invalidMethod } = require("../errors/index");

topicsRouter
  .route("/")
  .get(getAllTopics)
  .all(invalidMethod);

module.exports = topicsRouter;
