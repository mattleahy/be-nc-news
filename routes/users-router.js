const usersRouter = require("express").Router();
const { getUserById } = require("../controllers/users-c");
const { invalidMethod } = require("../errors/index");

usersRouter
  .route("/:username")
  .get(getUserById)
  .all(invalidMethod);

module.exports = usersRouter;
