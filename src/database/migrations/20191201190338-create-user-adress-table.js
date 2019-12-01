module.exports = {
  // creating AdressUser table
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user_address', {
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
      us_number: {
        type: Sequelize.STRING(10),
        allowNull: false,
      },
      us_cep: {
        type: Sequelize.STRING(25),
        allowNull: false,
      },
      us_address: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      neighborhood: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      us_complement: {
        type: Sequelize.STRING(200),
        allowNull: true,
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
    return queryInterface.dropTable('user_address');
  },
};
