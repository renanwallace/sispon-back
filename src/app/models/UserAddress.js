const { Sequelize, Model } = require('sequelize');

class UserAddress extends Model {
  static init(sequelize) {
    // setting table columns
    super.init(
      {
        us_id: Sequelize.INTEGER,
        us_number: Sequelize.INTEGER,
        us_cep: Sequelize.STRING,
        us_address: Sequelize.STRING,
        neighborhood: Sequelize.STRING,
        us_complement: Sequelize.STRING,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      {
        sequelize,
        tableName: 'user_address',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'us_id',
      as: 'user',
    });
  }
}

module.exports = UserAddress;
