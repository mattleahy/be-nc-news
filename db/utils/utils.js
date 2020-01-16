const connection = require("../connection");

exports.formatDates = articleData => {
  return articleData.map(({ ...articleDataCopy }) => {
    articleDataCopy.created_at = new Date(articleDataCopy.created_at);
    return articleDataCopy;
  });
};

exports.makeRefObj = articleData => {
  const result = {};
  articleData.forEach(item => {
    result[item.title] = item.article_id;
  });
  return result;
};

exports.formatComments = (comments, articleRef) => {
  return comments.map(({ created_by, belongs_to, created_at, ...rest }) => {
    return {
      ...rest,
      author: created_by,
      article_id: articleRef[belongs_to],
      created_at: new Date(created_at)
    };
  });
};

exports.checkArticle = article_id => {
  return connection
    .select("*")
    .from("articles")
    .where("article_id", "=", article_id)
    .then(articles => {
      if (articles.length === 0) {
        return Promise.reject({ status: 404, msg: "Article Not Found" });
      } else return { comments: [] };
    });
};

exports.checkAuthor = author => {
  return connection
    .select("*")
    .from("users")
    .where("username", "=", author)
    .then(authors => {
      if (authors.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      } else return [];
    });
};

exports.checkTopic = topic => {
  return connection
    .select("*")
    .from("topics")
    .where("slug", "=", topic)
    .then(topics => {
      if (topics.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      } else return [];
    });
};
