"use strict";

const express = require("express");
const Path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const bodyParser = require("body-parser");
const wechat = require("./middlewares/wechat");
const configuration = require("./configuration");

// routes
const index = require("./routes/index");
const operation = require("./routes/operation");

// viewEngine
const viewEngine = require("./engines/html");

const app = express();
const ROOT = Path.resolve(__dirname, "../");

// view engine setup
app.engine("html", viewEngine);
app.set("views", Path.resolve(ROOT, "app/views"));
app.set("view engine", "html");

// configuration
app.set("company", configuration.company);

// uncomment after placing your favicon in /public
app.use(favicon(Path.resolve(ROOT, "static", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/static", express.static(Path.resolve(ROOT, "static")));

// wechat authorize
app.use(wechat);

app.use("/operation", operation);
app.use("/", index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
