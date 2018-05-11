const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// loaders
const js = require('./loaders/js');
const css = require('./loaders/css');
const file = require('./loaders/file');
const constants = require('./constants');

const {
  ENV_VARS,
  DIST_DIR,
  ROOT_DIR,
  ENTRY_FILE,
  VENDOR_LIBS,
  TEMPLATE_FILE,
} = constants;

const config = {
  mode: 'production',
  entry: {
    vendors: VENDOR_LIBS,
    bundle: ENTRY_FILE,
  },
  output: {
    path: DIST_DIR,
    filename: '[name].[chunkhash].js',
    publicPath: '/wwStudio/'
  },
  module: {
    rules: [
      js.loader,
      ...file.loader,
      ...css.prod.loader,
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['docs'], { root: ROOT_DIR }),
    new HtmlWebpackPlugin({ template: TEMPLATE_FILE }),
    new webpack.DefinePlugin({ 'process.env': ENV_VARS }),
    css.prod.extract
  ]
};

module.exports = config;
