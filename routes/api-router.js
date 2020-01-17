const apiRouter = require("express").Router();
const topicsRouter = require("./topics-router");
const usersRouter = require("./users-router");
const commentsRouter = require("./comments-router");
const articlesRouter = require("./articles-router");
const { invalidMethod } = require("../errors/index");
const { getApiJSON } = require("../controllers/api-c");

apiRouter
  .route("/")
  .get(getApiJSON)
  .all(invalidMethod);

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
