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
