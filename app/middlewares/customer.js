const request = require("request");
const cv = require("config-vars");
const isString = require("lodash/isString");
const { API_INTERNAL_HOST, tryJson, getContentType } = require("../utils");

const promiseReq = (options) => {
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) {
                return resolve(null);
            }

            const contentType = getContentType(response.headers["content-type"]);
            if (body && isString(body) && contentType === "application/json") {
                body = tryJson(body);
            }

            const { statusCode } = response;
            switch (statusCode) {
                case 200:
                    return resolve(body);
                default:
                    console.error(body);
                    return resolve(null);
            };
        });
    });
};

module.exports = (req, res, next) => {
    if (req.auth && req.auth.token) {
        const { token } = req.auth;
        const customerOpts = {
            method: "GET",
            baseUrl: API_INTERNAL_HOST,
            url: "/api/customers/baseinfo",
            headers: { "Authorization": `${token.token_type} ${token.access_token}` }
        };

        return promiseReq(customerOpts).then((customer) => {
            if (customer) {
                req.customer = customer;
            }
            return next();
        });
    }

    return next();
};