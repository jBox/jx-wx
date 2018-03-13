const express = require("express");
const router = express.Router();

/* GET page. */
router.get("/:operation?/:any*?", (req, res, next) => {
  const { operation = "index" } = req.params;
  switch (operation) {
    case "index":
    case "rent":
    case "orders":
    case "profile":
      if (req.auth && req.auth.token) {
        const models = {
          title: req.app.get("company"),
          initialState: JSON.stringify({
            auth: req.auth,
            rent: {
              order: {
                name: "王小丫",
                mobile: "18688995566"
              }
            }
          })
        };

        return res.render("index", { models });
      }
  }

  return res.redirect("/login");
});

module.exports = router;
