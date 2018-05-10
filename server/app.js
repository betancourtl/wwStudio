const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const routes = require('./http/routes');
const mysqlConfig = require('./config/mysql');
const appErrorMiddleware = require('./http/middleware/appError');
const {
  DIST_DIR,
  DIST_DIR_INDEX_FILE,
} = require('../config/constants');

// start mysql connection
if (process.env.NODE_ENV !== 'test') {
  const connection = (mysql.createConnection(mysqlConfig));

  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected! to MySQL database');
  });
}

const app = express();

// middleware
app.use(bodyParser.json({ limit: '5mb' }));

// Routes
// Do not catch errors in here. Let the middleware take care of it.
routes(app);

// Error handling middleware
appErrorMiddleware(app);

// Development
if (process.env.NODE_ENV === 'development') {
  const webpackDevMiddleWare = require('webpack-dev-middleware');
  const webpackHotMiddleWare = require("webpack-hot-middleware");
  const webpack = require('webpack');
  const config = require('../config/webpack.dev');
  const compiler = webpack(config);

  const devMiddleware = webpackDevMiddleWare(compiler, {
    publicPath: config.output.publicPath,
    historyApiFallback: true,
    noInfo: true,
    hot: true,
  });

  const hotMiddleware = webpackHotMiddleWare(compiler);

  app.use(devMiddleware);
  app.use(hotMiddleware);

  // Dev files are written to memory
  app.get('*', (req, res) => {
    const htmlBuffer = devMiddleware.fileSystem.readFileSync(`${config.output.path}/index.html`);

    res.send(htmlBuffer.toString())
  });

  // Production
} else {
  // make these files public
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res) => res.sendFile(DIST_DIR_INDEX_FILE));
}

module.exports = app;
