const { Sequelize, Model } = require('sequelize');

class UserDevice extends Model {
  static init(sequelize) {
    // setting table columns
    super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
        },
        us_id: Sequelize.INTEGER,
        imei: Sequelize.STRING,
        number: Sequelize.STRING,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      {
        sequelize,
        tableName: 'user_device',
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'us_id',
      as: 'user',
      through: 'user_devices',
    });
  }
}

module.exports = UserDevice;
