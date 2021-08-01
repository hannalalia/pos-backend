'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.belongsTo(User,{
        foreignKey:'user_id'
      })
    }
    toJSON(){
      return {...this.get(),id:undefined}
    }
  };
  Sales.init({
    transaction_id:{
      type:DataTypes.UUID,
      allowNull:false,
      unique:true
    }, 
    user_id:{
      type:DataTypes.UUID,
      allowNull:false
    },
    transaction_datetime:{ 
      type:DataTypes.DATE,
      allowNull:false,
      unique:true
    },
    transaction_total_price:{
      type: DataTypes.FLOAT,
      allowNull:false
      }
  }, {
    sequelize,
    modelName: 'Sales',
  });
  return Sales;
};