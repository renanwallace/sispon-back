module.exports = {
  // creating users table
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      fun_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      us_admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      us_tel: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      us_other_tel: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      us_company: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      us_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      us_email: {
        type: Sequelize.STRING(120),
        allowNull: false,
        unique: true,
      },
      us_cpf: {
        type: Sequelize.STRING(15),
        allowNull: false,
        unique: true,
      },
      us_rg: {
        type: Sequelize.STRING(15),
        allowNull: true,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: null,
        onUpdate: Sequelize.fn('NOW'),
        allowNull: true,
      },
    });
  },

  // deleting users table
  down: queryInterface => {
    return queryInterface.dropTable('users');
  },
};
