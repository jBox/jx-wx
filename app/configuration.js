const cv = require("config-vars");

const version = require("../package").version;

module.exports = cv.setup((getenv) => ({
    version,
    port: getenv("JX_WX_PORT"),
    host: getenv("JX_WX_HOST"),
    jx: {
        company: getenv("JX_COMPANY_NAME"),
        apiPort: getenv("JX_API_PORT")
    },
    wx: {
        appid: getenv("JX_WX_APP_ID"),
        secret: getenv("JX_WX_APP_SECRET"),
        openHost: getenv("WX_OPEN_HOST")
    }
}));