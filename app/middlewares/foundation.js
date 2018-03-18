const request = require("request");
const cv = require("config-vars");
const isString = require("lodash/isString");
const { API_INTERNAL_HOST, tryJson, getContentType } = require("../utils");

const promiseReq = (options) => {
    return new Promise((resolve, reject) => {
        const DefaultValue = {};
        request(options, (error, response, body) => {
            if (error) {
                return resolve(DefaultValue);
            }

            const { statusCode } = response;
            switch (statusCode) {
                case 200:
                    const contentType = getContentType(response.headers["content-type"]);
                    if (body && isString(body) && contentType === "application/json") {
                        body = tryJson(body);
                    }
                    return resolve(body);
                default:
                    return resolve(DefaultValue);
            };
        });
    });
};

module.exports = (req, res, next) => {
    const statusOpts = {
        method: "GET",
        baseUrl: API_INTERNAL_HOST,
        url: "/api/orders/status"
    };

    const modelsOpts = {
        method: "GET",
        baseUrl: API_INTERNAL_HOST,
        url: "/api/vehicles/models"
    };

    return Promise.all([promiseReq(statusOpts), promiseReq(modelsOpts)]).then(([status, models]) => {
        req.foundation = { status, models };
        return next();
    });
}