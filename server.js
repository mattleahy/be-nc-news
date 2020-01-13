const express = require("express");
const server = express();
const apiRouter = require("./routes/api-router");
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
  handleRouteErrors
} = require("./errors");

server.use(express.json());

server.use("/api", apiRouter);

// error handling
server.use(handleCustomErrors);
server.use(handlePsqlErrors);
server.use(handleServerErrors);
server.all("/*", handleRouteErrors);

module.exports = server;
