const connection = require("../db/connection");

const selectArticleById = article_id => {
  return connection
    .select("articles.*")
    .count({ comment_count: "comment_id" })
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .where("articles.article_id", article_id)
    .groupBy("articles.article_id")
    .then(article => {
      if (article.length === 0)
        return Promise.reject({ status: 404, msg: "Article Does Not Exist" });
      else {
        return article[0];
      }
    });
};

const updateArticleById = (article_id, inc_votes = 0) => {
  return connection
    .increment("votes", inc_votes)
    .from("articles")
    .where("article_id", article_id)
    .returning("*")
    .then(([article]) => {
      if (!article)
        return Promise.reject({ status: 404, msg: "Article Does Not Exist" });
      else return article;
    });
};

module.exports = { selectArticleById, updateArticleById };
