const topicsRouter = require("express").Router();
const { getAllTopics } = require("../controllers/topics-c");

topicsRouter.route("/").get(getAllTopics);

module.exports = topicsRouter;
