const User = require('../models/User');
const userAdress = require('../models/User');

class UserController {
  async create(req, res) {
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      cpf: req.body.cpf,
      password: req.body.password,
    });

    const userAdress = await User.create({});

    res.send(user);
  }

  async findUserByCpf(req, res) {
    const user = await User.findOne({ where: { cpf: req.cpf } });

    if (!user) {
      return res.status(400).json({
        error: '$ User not found!',
        user_message: 'Usuário não encontrado!',
      });
    }
    return res.json(user);
  }

  async getAllUsers(req, res) {
    const user = await User.findAll({ where: { cpf: req.cpf } });
    if (!user) {
      return res.status(400).json({
        error: '$ User not found!',
        user_message: 'Usuário não encontrado!',
      });
    }
    return res.json(user);
  }
}

module.exports = new UserController();
