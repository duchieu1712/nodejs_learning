const DataTypes = require("sequelize").DataTypes;
const _orders = require("./orders");
const _products = require("./products");
const _user_type = require("./user_type");
const _users = require("./users");

function initModels(sequelize) {
  const orders = _orders(sequelize, DataTypes);
  const products = _products(sequelize, DataTypes);
  const user_type = _user_type(sequelize, DataTypes);
  const users = _users(sequelize, DataTypes);

  products.belongsToMany(users, { as: 'user_id_users', through: orders, foreignKey: "product_id", otherKey: "user_id" });
  users.belongsToMany(products, { as: 'product_id_products', through: orders, foreignKey: "user_id", otherKey: "product_id" });
  orders.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(orders, { as: "orders", foreignKey: "product_id"});
  users.belongsTo(user_type, { as: "type", foreignKey: "type_id"});
  user_type.hasMany(users, { as: "users", foreignKey: "type_id"});
  orders.belongsTo(users, { as: "user", foreignKey: "user_id"});
  users.hasMany(orders, { as: "orders", foreignKey: "user_id"});

  return {
    orders,
    products,
    user_type,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
