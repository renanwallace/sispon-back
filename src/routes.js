const express = require('express');
const UserController = require('./app/controllers/UserController');

const routes = express.Router();

routes.get('/', (req, res) => res.json({ msg: 'deu certo' }));
routes.get('/v1/users/:userId', (req, res) => res.send('ok'));
routes.post('/v1/users', UserController.create);

module.exports = routes;
