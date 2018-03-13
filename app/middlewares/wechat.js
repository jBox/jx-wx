const request = require("request");
const configuration = require("../configuration");

const API_HOST = `http://localhost:${configuration.apiPort}`;

const wechat = (req, res, next) => {
    const { code, state } = req.query;
    if (state === "operation") {
        if (!code) {
            return next(new Error("Invaild code."));
        }

        const { target } = req.params;
        const { wx: { appid, secret } } = configuration;
        // 200: access_token
        // 400: Bad request
        // 404: Not Found, need to get userinfo form wx
        // 500: failed
        // GET /oauth/token?secret=secret&code=code&grant_type=authorization_code`;
        const options = {
            method: "GET",
            baseUrl: API_HOST,
            url: "/oauth/token",
            qs: { code, secret: appid + secret, grant_type: "authorization_code" }
        };
        return request(options, (error, response, body) => {
            if (error) {
                return next(error);
            }

            if (typeof body === "string") {
                body = JSON.parse(body);
            }

            const { statusCode } = response;
            switch (statusCode) {
                case 200:
                    req.auth = { token: body };
                    return next();
                case 404:
                    return res.redirect(`/operation?type=authorize&scope=snsapi_userinfo&target=${target}`);
                default:
                    return next();
            }
        });
    }

    next();
}

module.exports = wechat;