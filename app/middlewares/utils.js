const cv = require("config-vars");
const isString = require("lodash/isString");
const ContentType = require("content-type");

const API_INTERNAL_HOST = `http://localhost:${cv.env.jx.apiPort}`;

const tryJson = (text) => {
    if (text && isString(text)) {
        try {
            return JSON.parse(text);
        } catch (ex) {
            console.error(ex);
        }
    }

    return text;
};

const getContentType = (header) => {
    try {
        const contentType = ContentType.parse(header);
        return contentType.type.toLowerCase();
    } catch (ex) {
        console.error(ex);
    }
};

module.exports = {
    API_INTERNAL_HOST,
    tryJson,
    getContentType
};