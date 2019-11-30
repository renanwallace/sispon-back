require('./database');
require('express-async-errors');
const Youch = require('youch');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const debug = require('debug');
const logger = require('morgan');
const express = require('express');
const routes = require('./routes');
const pkg = require('../package.json');
const ignoreFavicon = require('./app/middleware/IgnoreFavicon');

class App {
  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
    this.exceptionHandler();
    debug(`${pkg.name}:${pkg.main}`);
  }

  middleware() {
    this.server.use(ignoreFavicon);
    this.server.use(bodyParser.json({ limit: '10mb' }));
    this.server.use(logger('dev'));
    this.server.use(bodyParser.json());
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(cookieParser());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: '$ internal server error!' });
    });
  }

  routes() {
    this.server.use(routes);
  }
}

module.exports = new App().server;
