const Path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// Create multiple instances
const extractCSS = new ExtractTextPlugin("[name].css", {
    allChunks: true,
});

const config = require("./package").config;

module.exports = {
    entry: {
        app: "./src/index.js",
        rent: "./src/rent.js",
        orders: "./src/orders.js",
        profile: "./src/profile.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["env", "react", "stage-2"],
                },
            },
            {
                test: /\.css$/i,
                use: extractCSS.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                localIdentName: config.css,
                            },
                        },
                        "postcss-loader",
                    ],
                }),
            }
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    },
    plugins: [
        extractCSS,

        new CleanWebpackPlugin(["static/dist"])
    ],
    output: {
        filename: "[name].js",
        path: Path.resolve(__dirname, "static/dist")
    }
};