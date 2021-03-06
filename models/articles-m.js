const connection = require("../db/connection");

const { checkAuthor, checkArticle, checkTopic } = require("../db/utils/utils");

const selectAllArticles = (
  sort_by = "created_at",
  order = "desc",
  author,
  topic,
  page = 1,
  limit = 10
) => {
  return connection
    .select(
      "articles.author",
      "articles.title",
      "articles.article_id",
      "articles.created_at",
      "articles.votes",
      "articles.topic"
    )
    .count({ comment_count: "comment_id" })
    .from("articles")
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by, order)
    .limit(limit)
    .offset(page * limit - limit)
    .modify(query => {
      if (author) query.where("articles.author", "=", author);
      if (topic) query.where("articles.topic", "=", topic);
    })
    .then(articles => {
      if (articles.length === 0 && topic !== undefined) {
        return checkTopic(topic);
      } else if (articles.length === 0 && author !== undefined) {
        return checkAuthor(author);
      } else {
        return articles;
      }
    });
};

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

const insertCommentByArticleId = (article_id, comment) => {
  if (comment.body === "" || !comment.body) {
    return Promise.reject({ status: 400, msg: "Invalid post request" });
  }
  const commentToInsert = {
    author: comment.username,
    article_id: article_id,
    body: comment.body
  };
  return connection
    .returning("*")
    .insert(commentToInsert)
    .into("comments")
    .then(([comment]) => {
      return comment;
    });
};

const selectCommentsByArticleId = (
  article_id,
  sort_by = "created_at",
  order = "desc",
  limit = 10,
  page = 1
) => {
  return connection
    .select("comment_id", "votes", "created_at", "author", "body")
    .from("comments")
    .where("article_id", "=", article_id)
    .orderBy(sort_by, order)
    .limit(limit)
    .offset(page * limit - limit)
    .then(comments => {
      if (!comments.length) {
        return checkArticle(article_id);
      }
      return { comments: comments };
    });
};

module.exports = {
  selectAllArticles,
  selectArticleById,
  updateArticleById,
  insertCommentByArticleId,
  selectCommentsByArticleId
};
