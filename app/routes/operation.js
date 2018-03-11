const express = require("express");
const router = express.Router();

/* operation */
// sample: https://wx.xxx.com/operation?type=authorize&target=order
// type input as wechat user menu external link.
router.get("/", (req, res, next) => {
    const { type, target, scope = "snsapi_base" } = req.query;
    if (type === "authorize") {
        const targetUrl = encodeURIComponent(`https://wx.xxx.com/${target}`)
        // snsapi_base Url
        const redirectUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${targetUrl}&response_type=code&scope=${scope}&state=operation#wechat_redirect`;
        res.redirect(redirectUrl);
    }

    return next(new Error());
});

module.exports = router;
