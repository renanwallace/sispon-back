const { Sequelize } = require('sequelize');
const config = require('../config/database');
const User = require('../app/models/User');
const UserAddress = require('../app/models/UserAddress');
const UserDevice = require('../app/models/UserDevice');

const models = [User, UserAddress, UserDevice];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // creates connection string
    this.connection = new Sequelize(config);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

module.exports = new Database();
