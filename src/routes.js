const express = require('express');
const UserController = require('./app/controllers/UserController');
const UserValidation = require('./app/middleware/UserValidation');

class Router {
  constructor() {
    this.routes = express.Router();
    this.ping();
    this.userRoutes();
  }

  ping() {
    this.routes.get('/', (req, res) => res.json({ msg: 'ok' }));
  }

  userRoutes() {
    this.routes.get('/users/:userId', (req, res) => res.send('ok'));
    this.routes.get('/users', UserController.index);
    this.routes.post(
      '/users',
      UserValidation.validateInsertUser,
      UserController.store
    );
  }
}

module.exports = new Router().routes;
