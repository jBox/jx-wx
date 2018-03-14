const express = require("express");
const router = express.Router();
const cv = require("config-vars");

const operations = ["index", "rent", "orders", "profile"];

/* GET page. */
router.get("/:operation?/:any*?", (req, res, next) => {
  const { operation = "index" } = req.params;
  if (operations.includes(operation)) {
    if (req.auth && req.auth.token) {
      const state = {
        auth: req.auth,
        settings: { api: cv.env.jx.apiHost }
      };
      const models = {
        title: req.app.get("company"),
        initialState: JSON.stringify(state)
      };

      return res.render("index", { models });
    } else {
      return res.redirect("/login");
    }
  }

  return next();
});

module.exports = router;
