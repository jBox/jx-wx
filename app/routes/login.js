const express = require("express");
const cv = require("config-vars");
const router = express.Router();

/* login */
// sample: /login?target=target
router.get("/", (req, res, next) => {
    const { target = "index" } = req.query;
    const models = {
        wecharRedirectLogin: `/operation?type=authorize&target=${target}`
    };
    res.render("login", { models });
});

/* login */
// sample: /login?target=rent
router.post("/", (req, res, next) => {
    const { target = "index" } = req.query;
    const { username, password } = req.body;
    res.render("login", {
        models: {
            wecharRedirectLogin: `/operation?type=authorize&target=${target}`,
            error: {
                status: 403,
                message: "用户名或者密码不正确"
            }
        }
    });
});

module.exports = router;
