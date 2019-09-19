/* eslint-disable @typescript-eslint/no-var-requires */
import Merge from "webpack-merge";
import webpack from "webpack";
import { commonConfig } from "./webpack.config.common";
// @ts-ignore
import ErrorOverlayPlugin from "error-overlay-webpack-plugin"

module.exports = Merge(commonConfig, {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: [
    "webpack-hot-middleware/client?reload=true&timeout=1000&overlay=true"
  ],
  plugins: [new webpack.HotModuleReplacementPlugin(), new ErrorOverlayPlugin()]
});
