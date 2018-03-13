const express = require("express");
const configuration = require("../configuration");
const router = express.Router();

const OpenAuthorizeApiPath = "http://localhost:3000/authorize";
// const OpenAuthorizeApiPath = "https://open.weixin.qq.com/connect/oauth2/authorize";

/* operation */
// sample: /operation?type=authorize&target=rent
// type input as wechat user menu external link.
router.get("/", (req, res, next) => {
    const { type, target, scope = "snsapi_base" } = req.query;
    if (type === "authorize") {        
        const { wx: { appid } } = configuration; 
        const targetUrl = encodeURIComponent(`http://localhost:5079/${target}`)
        // snsapi_base Url
        const redirectUrl = `${OpenAuthorizeApiPath}?appid=${appid}&redirect_uri=${targetUrl}&response_type=code&scope=${scope}&state=operation#wechat_redirect`;
        return res.redirect(redirectUrl);
    }

    return next(new Error());
});

module.exports = router;
