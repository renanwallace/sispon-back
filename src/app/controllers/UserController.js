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
      us_other_tel,
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
    const telUsed = await User.findOne({ where: { us_tel } });
    const secondTelUsed = await User.findOne({ where: { us_other_tel } });

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

    if (telUsed) {
      return res.status(400).json({
        user_message: 'Telefone já utilizado',
      });
    }

    if (secondTelUsed) {
      return res.status(400).json({
        user_message: 'Telefone outros já utilizado',
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
        us_other_tel,
      },
      {
        include: [
          {
            model: UserAddress,
            as: 'address',
          },
          {
            model: UserDevice,
            as: 'devices',
          },
        ],
      }
    ).catch(err => {
      throw res.status(500).json({ user_message: 'Erro interno', error: err });
    });

    return res.json(user);
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
          as: 'devices',
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

  async storeDevice(req, res) {
    const { us_cpf, imei, service_id, number } = req;
    const userExists = await User.findAll({ where: { us_cpf } });

    if (!userExists) {
      return res.status(400).json({
        error: '$ User not found!',
        user_message: 'Nenhum usuário encontrado para o CPF informado!',
      });
    }

    const user = await UserDevice.create(
      {
        us_cpf,
        imei,
        service_id,
        number,
      },
      {
        include: [
          {
            model: User,
            as: 'users',
          },
        ],
      }
    ).catch(err => {
      throw res.status(500).json({ user_message: 'Erro interno', error: err });
    });

    return res.json(user);
  }
}

module.exports = new UserController();
