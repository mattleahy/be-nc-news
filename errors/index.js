exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  const psqlErr = { "": [400, "Bad Request"] };
  if (Object.keys(psqlErr).includes(err.code)) {
    res.status(psqlErr[err.code][0]).send({ msg: psqlErr[err.code][1] });
  } else next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Error" });
};

exports.handleRouteErrors = (req, res, next) => {
  res.status(404).send({ msg: "Route Not Found" });
};
