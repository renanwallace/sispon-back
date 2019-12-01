const { Sequelize, Model } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    // setting table columns
    super.init(
      {
        id: {
          primaryKey: true,
          type: Sequelize.INTEGER,
          autoIncrement: true,
        },
        fun_id: Sequelize.BOOLEAN,
        us_admin: Sequelize.BOOLEAN,
        us_company: Sequelize.BOOLEAN,
        us_tel: Sequelize.STRING,
        us_name: Sequelize.STRING,
        us_email: Sequelize.STRING,
        us_cpf: Sequelize.STRING,
        us_rg: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      {
        sequelize,
        tableName: 'users',
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.hasOne(models.UserAddress, {
      foreignKey: 'us_id',
      as: 'address',
    });

    this.belongsToMany(models.UserDevice, {
      foreignKey: 'us_id',
      as: 'devices',
      through: 'user_devices',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

module.exports = User;
