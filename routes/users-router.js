const usersRouter = require("express").Router();
const { getUserById, getAllUsers } = require("../controllers/users-c");
const { invalidMethod } = require("../errors/index");

usersRouter
  .route("/")
  .get(getAllUsers)
  .all(invalidMethod);

usersRouter
  .route("/:username")
  .get(getUserById)
  .all(invalidMethod);

module.exports = usersRouter;
