const connection = require("../db/connection");

const selectArticleById = article_id => {
  return connection
    .select("*")
    .from("articles")
    .where("article_id", article_id)
    .then(article => {
      if (article.length === 0)
        return Promise.reject({ status: 404, msg: "Article Does Not Exist" });
      return article;
    });
};

module.exports = selectArticleById;
