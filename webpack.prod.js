const webpack = require("webpack");
const Path = require("path");
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const common = require("./webpack.common.js");
const WebpackChunkHash = require("webpack-chunk-hash");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(common, {
    devtool: "source-map",
    output: {
        filename: "[name].[chunkhash].js",
        path: Path.resolve(__dirname, "static/dist")
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),

        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].[chunkhash].css"
        }),

        new WebpackChunkHash(),

        new ManifestPlugin()
    ]
});