const { Sequelize, Model } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    // setting table columns
    super.init(
      {
        id: { primaryKey: true, type: Sequelize.INTEGER, autoIncrement: true },
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        cpf: Sequelize.STRING,
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

  // static associate(models) {
  //   this.hasMany(models.UserAdress, { foreignKey: 'user_id', as: 'addresses' });
  // }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

module.exports = User;
