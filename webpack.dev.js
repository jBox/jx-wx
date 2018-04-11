const merge = require("webpack-merge");
const Path = require("path");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    devtool: "inline-source-map",
    output: {
        filename: "[name].js",
        path: Path.resolve(__dirname, "static/dist")
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css"
        })
    ]
});