const User = require('../models/User');
const UserAddress = require('../models/UserAddress');
const UserDevice = require('../models/UserDevice');

class DeviceController {
  async store(req, res) {
    const { us_cpf, imei, service_id, number } = req;

    const userExists = await User.findOne({ where: { us_cpf } });

    const imeiUser = await UserDevice.findOne({ where: { imei } });
    const numberUser = await UserDevice.findOne({ where: { number } });

    if (imeiUser) {
      return res.status(400).json({
        user_message: 'IMEI já utilizado em outro usuário',
      });
    }

    if (numberUser) {
      return res.status(400).json({
        user_message: 'CHIP já utilizado em outro usuário',
      });
    }

    const { id } = userExists.dataValues;

    if (!userExists) {
      return res.status(400).json({
        error: '$ User not found!',
        user_message: 'Nenhum usuário encontrado para o CPF informado!',
      });
    }

    const user = await UserDevice.create(
      {
        us_id: id,
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
}

module.exports = new DeviceController();
