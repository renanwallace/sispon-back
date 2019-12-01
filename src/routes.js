const express = require('express');
const UserController = require('./app/controllers/UserController');
const UserValidation = require('./app/middlewares/UserValidation');
const SessionController = require('./app/controllers/SessionController');
const authMiddleware = require('./app/middlewares/auth');

class Router {
  constructor() {
    this.routes = express.Router();
    this.ping();
    this.sessionRoutes();
    this.middleware();
    this.userRoutes();
    this.securityFilter();
  }

  sessionRoutes() {
    this.routes.post(
      '/sessions',
      UserValidation.validateUserSession,
      SessionController.store
    );
  }

  middleware() {
    this.routes.use(authMiddleware);
  }

  securityFilter() {}

  ping() {
    this.routes.get('/', ({ res }) => res.json({ msg: 'ok' }));
  }

  userRoutes() {
    this.routes.get(
      '/users/:us_cpf',
      UserValidation.validateFindByCPF,
      UserController.findUserByCpf
    );
    this.routes.get('/users', UserController.index);
    this.routes.post(
      '/users',
      UserValidation.validateInsertUser,
      UserController.store
    );
  }
}

module.exports = new Router().routes;
