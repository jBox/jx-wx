const express = require("express");
const cv = require("config-vars");
const router = express.Router();

/* login */
// sample: /login?returnUrl=rent
router.get("/", (req, res, next) => {
    const { returnUrl } = req.query;

    res.render("login");
});

module.exports = router;
