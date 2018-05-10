const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('styles.css');

const cssLoaderProd = [
  {
    test: /\.css$/,
    use: extractCSS.extract(['css-loader'])
  },
  {
    test: /\.scss$/i,
    use: extractCSS.extract(['css-loader', 'sass-loader'])
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