const request = require("request");
const configuration = require("../configuration");

const wechat = (req, res, next) => {
    const { code, state } = req.query;
    if (state === "operation") {
        if (!code) {
            return next(new Error());
        }

        const { operation } = req.params;
        const { wx: { appid, secret } } = configuration;
        // call GET https://localhost:5079/oauth/access_token?appid={AppId}&secret={Secret}&code={code}&grant_type=authorization_code
        // 200: access_token
        // 400: Bad request
        // 404: Not Found, need to get userinfo form wx
        // 500: failed
        const url = `https://localhost:5079/oauth/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`;
        return request(url).then(r => {
            const { data: token, statusCode } = r.data;
            switch (statusCode) {
                case 200:
                    req.auth = { token };
                    return next();
                case 404:
                    return res.redirect(`/operation?type=oauth&scope=snsapi_userinfo&target=${operation}`);
            }
        });
    }

    next();
}

module.exports = wechat;