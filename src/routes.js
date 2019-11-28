const express = require('express');
const UserController = require('./app/controllers/UserController');

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
    this.routes.get('/v1/users/:userId', (req, res) => res.send('ok'));
    this.routes.post('/v1/users', UserController.create);
    this.routes.get('/v1/users', UserController.getAllUsers);
  }
}

module.exports = new Router().routes;
