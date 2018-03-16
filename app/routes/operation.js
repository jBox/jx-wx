const express = require("express");
const cv = require("config-vars");
const router = express.Router();

/* operation */
// sample: /operation?type=authorize&target=rent
// type input as wechat user menu external link.
router.get("/", (req, res, next) => {
    const { type, target, scope = "snsapi_base" } = req.query;
    if (type === "authorize") {
        const { wx: { appid, openHost }, host } = cv.env;
        const targetUrl = encodeURIComponent(`${host}/${target}`)
        // snsapi_base Url
        const qs = `appid=${appid}&redirect_uri=${targetUrl}&response_type=code&scope=${scope}&state=operation#wechat_redirect`;
        const redirectUrl = `${openHost}/connect/oauth2/authorize?${qs}`;
        return res.redirect(redirectUrl);
    }

    return next(new Error());
});

module.exports = router;
