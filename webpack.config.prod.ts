import Merge from "webpack-merge";
import { commonConfig } from "./webpack.config.common";

module.exports = Merge(commonConfig, {
  mode: "production"
});
