"use strict";

const fs = require("fs-extra");

/**
 * @param {string}   file
 * @param {object}   opts
 * @param {function} cb
 */
module.exports = (file, opts, cb) => {

    try {
        fs.readFile(file, "utf8").then((html) => {
            const markup = html.replace(/{{.+?}}/ig, m => {
                const [, key] = Array.from(/^{{(.+?)}}$/ig.exec(m));
                if (/\.(cs|j)s$/ig.test(key)) {
                    return key;
                }

                return opts.hasOwnProperty(key) ? opts[key] : "";
            });

            cb(null, markup);
        }).catch((error) => cb(error));
    } catch (e) {
        return void cb(e);
    }
};