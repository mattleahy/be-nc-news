const usersRouter = require("express").Router();
const { getUserById } = require("../controllers/users-c");

usersRouter.route("/:username").get(getUserById);

module.exports = usersRouter;
