const { Sequelize, Model } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    // setting table columns
    super.init(
      {
        us_id: Sequelize.INTEGER,
        number: Sequelize.INTEGER,
        cep: Sequelize.STRING,
        adress: Sequelize.STRING,
        complement: Sequelize.STRING,
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

module.exports = User;
