module.exports = {
  // creating AdressUser table
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_adress', {
      us_id: {
        type: Sequelize.INTEGER,
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
      company: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      },
    });
  },

  // deleting users table
  down: queryInterface => {
    return queryInterface.dropTable('user_adress');
  },
};
