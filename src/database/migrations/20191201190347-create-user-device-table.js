module.exports = {
  // creating AdressUser table
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_device', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      us_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onUpadte: 'CASCADE',
        onDelete: 'CASCADE',
      },
      imei: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      number: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        onUpdate: Sequelize.fn('NOW'),
        allowNull: true,
      },
    });
  },

  // deleting users table
  down: queryInterface => {
    return queryInterface.dropTable('user_device');
  },
};
