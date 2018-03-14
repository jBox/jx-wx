const request = require("request");
const md5 = require("md5");
const cv = require("config-vars");

const API_INTERNAL_HOST = `http://localhost:${cv.env.jx.apiPort}`;

const wechat = (req, res, next) => {
    const { code, state } = req.query;
    if (state === "operation") {
        if (!code) {
            return next(new Error("Invaild code."));
        }

        const { target } = req.params;
        const { wx: { appid, secret } } = cv.env;
        // 200: access_token
        // 400: Bad request
        // 404: Not Found, need to get userinfo form wx
        // 500: failed
        // GET /oauth/token?secret=secret&code=code&grant_type=authorization_code`;
        const options = {
            method: "GET",
            baseUrl: API_INTERNAL_HOST,
            url: "/oauth/token",
            qs: { code, secret: md5(appid + secret), grant_type: "authorization_code" }
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
                default:
                    return next();
            }
        });
    }

    next();
}

module.exports = wechat;