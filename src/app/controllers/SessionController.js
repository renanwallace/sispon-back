const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authConfig = require('../../config/auth');

class SessionController {
  // POST: /sessions
  async store(req, res) {
    const { us_email, password } = req;
    const user = await User.findOne({ where: { us_email } });

    if (!user) {
      return res.status(401).json({
        error: '$ user not found!',
        client_error: 'Usuário não encontrado',
      });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({
        error: '$ password does not match!',
        client_error: 'Senha incorreta',
      });
    }

    const { id, name } = user;

    return res.json({
      user: { id, name, us_email },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

module.exports = new SessionController();
