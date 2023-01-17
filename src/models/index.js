require('colors');
const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(
  config.dbname,
  config.username,
  config.password,
  {
    dialect: 'mysql',
    host: config.host,
    port: config.port,
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Sequelize Connected'.green);
  } catch (error) {
    console.log('Sequelize Error'.red, error);
  }
})();


module.exports = {
  sequelize,
};
