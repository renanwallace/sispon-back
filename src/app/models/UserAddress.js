const Sequelize = require('sequelize');

class User extends Sequelize.Model {
  static init(sequelize) {
    // setting table columnsN
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

    return this;
  }
}

module.exports = User;
