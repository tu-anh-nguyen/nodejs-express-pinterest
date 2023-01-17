const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  username: process.env.USERNAME || 'root',
  password: process.env.PASSWORD || '123456',
  port: process.env.PORT || 3307,
  host: process.env.HOST || 'localhost',
  dbname: process.env.DB_NAME || 'food1',
  domain: process.env.DOMAIN || 'http://localhost:4000',
  jwtSecretKey: process.env.JWT_SECRET_KEY || 'jwtSecretKey',
};
