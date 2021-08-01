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
    //hides the id attribute on response
    toJSON(){
      return {...this.get(),id:undefined}
    }
  };
  User.init({
    _id: DataTypes.UUID,
    username:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      // isAlphanumeric: true
    },
    email:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      isEmail: true, 
    },
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};