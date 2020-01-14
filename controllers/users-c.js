const selectUserById = require("../models/users-m");

exports.getUserById = (req, res, next) => {
  const { username } = req.params;
  selectUserById(username)
    .then(user => {
      res.status(200).send({ user });
    })
    .catch(next);
};
