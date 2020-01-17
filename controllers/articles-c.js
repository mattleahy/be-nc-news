const {
  selectAllArticles,
  selectArticleById,
  updateArticleById,
  insertCommentByArticleId,
  selectCommentsByArticleId
} = require("../models/articles-m");

exports.getAllArticles = (req, res, next) => {
  const { sort_by, order, author, topic, page, limit } = req.query;
  selectAllArticles(sort_by, order, author, topic, page, limit)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  updateArticleById(article_id, inc_votes)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  insertCommentByArticleId(article_id, req.body)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const { sort_by, order, limit, page } = req.query;
  selectCommentsByArticleId(req.params.article_id, sort_by, order, limit, page)
    .then(returnedComments => {
      res.status(200).send(returnedComments);
    })
    .catch(next);
};
