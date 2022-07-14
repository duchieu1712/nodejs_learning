const {Sequelize} = require('sequelize')
const config = require('../config/index')

const sequelize = new Sequelize(config.db_name, config.db_user, config.db_password, {
    host: config.db_host,
    port: config.db_port,
    dialect: config.db_dialect
});

module.exports = sequelize;

// try {
//      sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }