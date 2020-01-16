const commentsRouter = require("express").Router();
const {
  patchCommentById,
  deleteCommentById
} = require("../controllers/comments-c");
const { invalidMethod } = require("../errors/index");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .delete(deleteCommentById)
  .all(invalidMethod);

module.exports = commentsRouter;
