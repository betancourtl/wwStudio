const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const extractCSS = new MiniCssExtractPlugin({
  // Options similar to the same options in webpackOptions.output
  // both options are optional
  filename: "[name].css",
  chunkFilename: "[id].css"
});

const cssLoaderProd = [
  {
    test: /\.s?[ac]ss$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'sass-loader',
    ]
  },
];

const cssLoaderDev = [
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.scss$/i,
    use: ['style-loader', 'css-loader', 'sass-loader'],
  },
];


module.exports = {
  prod: {
    loader: cssLoaderProd,
    extract: extractCSS,
  },
  dev: {
    loader: cssLoaderDev
  }
};