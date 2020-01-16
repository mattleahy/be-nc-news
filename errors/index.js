exports.invalidMethod = (req, res, next) => {
  res.status(405).send({ msg: "method not allowed" });
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.handlePsqlErrors = (err, req, res, next) => {
  // console.log(err);
  const psqlErr = {
    "22P02": [400, "Invalid Value"],
    "23503": [404, "Target path does not exist"],
    "23502": [400, "Key data not input"],
    "42703": [400, "Bad request"]
  };
  if (Object.keys(psqlErr).includes(err.code)) {
    res.status(psqlErr[err.code][0]).send({ msg: psqlErr[err.code][1] });
  } else next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  // console.log(err);
  res.status(500).send({ msg: "Internal Server Error" });
};

exports.handleRouteErrors = (req, res, next) => {
  res.status(404).send({ msg: "Route Not Found" });
};
