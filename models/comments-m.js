const connection = require("../db/connection");

const updateCommentById = (comment_id, inc_votes = 0) => {
  return connection("comments")
    .where("comment_id", comment_id)
    .increment("votes", inc_votes)
    .returning("*")
    .then(comment => {
      if (comment.length === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      } else return comment;
    });
};

const removeCommentById = comment_id => {
  return connection("comments")
    .where("comment_id", "=", comment_id)
    .del()
    .then(response => {
      if (response === 0) {
        return Promise.reject({ status: 404, msg: "Not found" });
      }
      console.log("Comment deleted");
    });
};

module.exports = { updateCommentById, removeCommentById };
