const User = require('../models/User');
const UserAddress = require('../models/UserAddress');

class UserController {
  async store(req, res) {
    const {
      fun_id,
      us_admin,
      us_company,
      us_tel,
      us_name,
      us_email,
      us_cpf,
      us_rg,
      password,
      address,
    } = req;
    const user = await User.create(
      {
        fun_id,
        us_admin,
        us_company,
        us_tel,
        us_name,
        us_email,
        us_cpf,
        us_rg,
        password,
        address,
      },
      {
        include: [
          {
            model: UserAddress,
            as: 'address',
          },
        ],
      }
    ).catch(err => {
      console.error(err);
    });
    res.send(user);
  }

  async index({ res }) {
    const user = await User.findAll({
      order: ['id'],
      include: [
        {
          model: UserAddress,
          as: 'address',
        },
      ],
    });

    if (!user) {
      return res.status(400).json({
        error: '$ User not found!',
        user_message: 'Usuário não encontrado!',
      });
    }

    return res.json(user);
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
