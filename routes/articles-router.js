const articlesRouter = require("express").Router();
const {
  getAllArticles,
  getArticleById,
  patchArticleById,
  postCommentByArticleId,
  getCommentsByArticleId
} = require("../controllers/articles-c");
const { invalidMethod } = require("../errors/index");

articlesRouter
  .route("/")
  .get(getAllArticles)
  .all(invalidMethod);

articlesRouter
  .route("/:article_id")
  .get(getArticleById)
  .patch(patchArticleById)
  .all(invalidMethod);

articlesRouter
  .route("/:article_id/comments")
  .post(postCommentByArticleId)
  .get(getCommentsByArticleId)
  .all(invalidMethod);

module.exports = articlesRouter;
