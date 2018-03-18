const request = require("request");
const md5 = require("md5");
const cv = require("config-vars");
const isString = require("lodash/isString");
const { API_INTERNAL_HOST, tryJson, getContentType } = require("../utils");

const wechat = (req, res, next) => {
    const { code, state } = req.query;
    if (state === "operation") {
        if (!code) {
            return next(new Error("Invaild code."));
        }

        const { target } = req.params;
        const { wx: { appid, secret } } = cv.env;
        // 200: access_token
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

            const { statusCode } = response;
            if (statusCode === 200) {
                const contentType = getContentType(response.headers["content-type"]);
                if (body && isString(body) && contentType === "application/json") {
                    body = tryJson(body);
                }

                req.auth = { token: body };
            }

            return next();
        });
    }

    return next();
}

module.exports = wechat;