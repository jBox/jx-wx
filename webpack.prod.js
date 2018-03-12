const webpack = require("webpack");
const Path = require("path");
const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common.js");
const WebpackChunkHash = require("webpack-chunk-hash");
const ManifestPlugin = require("webpack-manifest-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(common, {
    devtool: "source-map",
    output: {
        filename: "[name].[chunkhash].js",
        path: Path.resolve(__dirname, "static/dist")
    },
    plugins: [
        new ExtractTextPlugin("[name].[contenthash].css", {
            allChunks: true,
        }),

        new UglifyJSPlugin({
            sourceMap: true
        }),

        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),

        new WebpackChunkHash(),

        new ManifestPlugin()
    ]
});