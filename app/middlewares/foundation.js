const request = require("request");
const cv = require("config-vars");

const API_INTERNAL_HOST = `http://localhost:${cv.env.jx.apiPort}`;

const promiseReq = (options) => {
    return new Promise((resolve, reject) => {
        const DefaultValue = {};
        request(options, (error, response, body) => {
            if (error) {
                return resolve(DefaultValue);
            }

            if (body && typeof body === "string") {
                body = JSON.parse(body);
            }

            const { statusCode } = response;
            switch (statusCode) {
                case 200:
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