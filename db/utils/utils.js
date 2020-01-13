exports.formatDates = articleData => {
  return articleData.map(({ ...articleDataCopy }) => {
    articleDataCopy.created_at = new Date(articleDataCopy.created_at);
    return articleDataCopy;
  });
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};
