const User = require('../models/User');
const UserAddress = require('../models/UserAddress');
const UserDevice = require('../models/UserDevice');

class UserController {
  // POST: /users
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

    const emailUsed = await User.findOne({ where: { us_email } });
    const cpfUsed = await User.findOne({ where: { us_cpf } });
    const rgUsed = await User.findOne({ where: { us_rg } });

    if (emailUsed) {
      return res.status(400).json({
        user_message: 'Email já utilizado',
      });
    }

    if (cpfUsed) {
      return res.status(400).json({
        user_message: 'CPF já utilizado',
      });
    }

    if (rgUsed) {
      return res.status(400).json({
        user_message: 'RG já utilizado',
      });
    }

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
          {
            model: UserDevice,
            as: 'user_devices',
          },
        ],
      }
    );

    return res.send(user);
  }

  // GET: /users
  async index({ res }) {
    const user = await User.findAll({
      order: ['id'],
      include: [
        {
          model: UserAddress,
          as: 'address',
        },
        {
          model: UserDevice,
          as: 'user_devices',
        },
      ],
    });

    if (!user) {
      return res.status(400).json({
        error: '$ User not found!',
        client_error: 'Usuário não encontrado!',
      });
    }
    return res.json(user);
  }

  // GET: /users/:us_cpf
  async findUserByCpf(req, res) {
    const user = await User.findOne({
      where: {
        us_cpf: req.params.us_cpf,
      },
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

  async getAllUsers(req, res) {
    const user = await User.findAll();
    if (!user) {
      return res.status(400).json({
        error: '$ User not found!',
        user_message: 'Nenhum usuário encontrado!',
      });
    }
    return res.json(user);
  }
}

module.exports = new UserController();
