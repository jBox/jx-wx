"use strict";

const express = require("express");
const Path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const bodyParser = require("body-parser");
const wechat = require("./middlewares/wechat");
const cv = require("config-vars");

// routes
const index = require("./routes/index");
const operation = require("./routes/operation");
const login = require("./routes/login");

// viewEngine
const viewEngine = require("./engines/html");

const app = express();
const ROOT = Path.resolve(__dirname, "../");

// view engine setup
app.engine("html", viewEngine);
app.set("views", Path.resolve(ROOT, "app/views"));
app.set("view engine", "html");

// configuration
app.set("manifest", Path.resolve(ROOT, "static/dist/manifest.json"));
app.set("company", cv.env.jx.company);

// uncomment after placing your favicon in /public
app.use(favicon(Path.resolve(ROOT, "static", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/static", express.static(Path.resolve(ROOT, "static")));

// wechat authorize
app.use("/:target?", wechat);

app.use("/login", login);
app.use("/operation", operation);
app.use("/", index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.render("404");
});

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.render("error");
});

module.exports = app;
