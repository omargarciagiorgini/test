'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    bio: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'User',
  }
  //, {
  //   // disable the modification of table names; By default, sequelize will automatically
  //   // transform all passed model names (first parameter of define) into plural.
  //   // if you don't want that, set the following
  //   freezeTableName: true,
  // }
  );
  return User;
};