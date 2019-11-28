const User = require('../models/User');
const db = require('../../database');

class UserController {
  async create(req, res) {
    console.log(db);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      cpf: req.body.cpf,
      password: req.body.password,
    });
    // console.log(user);

    res.send({ User });
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
}

module.exports = new UserController();
