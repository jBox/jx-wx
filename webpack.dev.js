"use strict";

const merge = require("webpack-merge");
const Path = require("path");
const common = require("./webpack.common.js");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(common, {
    devtool: "inline-source-map",
    output: {
        filename: "[name].js",
        path: Path.resolve(__dirname, "static/dist")
    },
    plugins: [
        new ExtractTextPlugin("[name].css", {
            allChunks: true,
        })
    ]
});