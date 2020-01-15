const articlesRouter = require("express").Router();
const {
  getArticleById,
  patchArticleById,
  postCommentByArticleId,
  getCommentsByArticleId
} = require("../controllers/articles-c");

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById);

articlesRouter
  .route("/:article_id/comments")
  .post(postCommentByArticleId)
  .get(getCommentsByArticleId);

module.exports = articlesRouter;
