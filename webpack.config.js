const path = require("path");

const mode =
  process.env.NODE_ENV === "production" ? "production" : "development";

module.export = {
  mode: "development",

  mode,

  entry: "/.src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  devtool: "source-map",
};
