"use strict";

const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Path = require("path");

const config = require("./package").config;

module.exports = {
    entry: { main: Path.resolve("src/index.js") },
    module: {
        rules: [
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/i,
                use: ExtractTextPlugin.extract({
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
            },
        ],
    },

    plugins: [
        // vendor
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: (module) => {
                return module.context && module.context.indexOf("node_modules") !== -1;
            }
        })
    ]
};
