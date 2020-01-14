const connection = require("../db/connection");

const selectUserById = username => {
  return connection
    .select("*")
    .from("users")
    .where("username", username)
    .then(user => {
      if (user.length === 0)
        return Promise.reject({ status: 404, msg: "User Not Found" });
      else return user;
    });
};

module.exports = selectUserById;
