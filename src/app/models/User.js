const bcrypt = require('bcryptjs');
const { Sequelize, Model } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    // setting table columns
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        cpf: Sequelize.STRING,
        birthday: Sequelize.DATE,
        company: Sequelize.BOOLEAN,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

module.exports = User;
