"use strict";

const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Path = require("path");
const WebpackChunkHash = require("webpack-chunk-hash");
const ManifestPlugin = require("webpack-manifest-plugin");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
    devtool: "source-map",
    output: {
        filename: "[name].[chunkhash].js",
        path: Path.resolve(__dirname, "static/dist")
    },
    plugins: [new webpack.DefinePlugin({
        "process.env": {
          "NODE_ENV": JSON.stringify("production")
        }
      }),
  
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
  
      new ExtractTextPlugin("[name].[contenthash].css", {
        allChunks: true,
      }),
    
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true
        },
        comments: false
      }),
  
      new webpack.HashedModuleIdsPlugin(),
  
      new WebpackChunkHash(),
  
      new ManifestPlugin()
    ]
});