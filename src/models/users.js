const { DataTypes, Model } = require('sequelize');
const sequelize = require('./index')

class User extends Model {}

User.init({
  // Model attributes are defined here
  userId:{
    field: "user_id",
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    validate: {
        isNumeric:{
            msg: "user id is number"
        }
    }
  },
  userName: {
    field: "user_name",
    type: DataTypes.STRING
  },
  userPassword: {
    field: "user_password",
    type: DataTypes.STRING
  },
  firstName: {
    field: "first_name",
    type: DataTypes.STRING
  },
  lastName: {
    field: "last_name",
    type: DataTypes.STRING
  },
  sdt: {
    field: "sdt",
    type: DataTypes.STRING
  },
  typeId: {
    field: "type_id",
    type: DataTypes.STRING
  },
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'User', // We need to choose the model name
  tableName: 'users',
  timestamps: false
});

module.exports = User;