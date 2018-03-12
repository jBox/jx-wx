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
      return res.render("index", {
        models: {
          title: req.app.get("company"),
          initialState: JSON.stringify({
            rent: {
              order: {
                name: "王小丫",
                mobile: "18688995566"
              }
            }
          })
        }
      });
    default:
      return next();
  }
});

module.exports = router;
