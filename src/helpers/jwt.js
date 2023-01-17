const jwt = require('jsonwebtoken');
const config = require('../config');

const generateJWT = ({ id, email }, expiresIn = '24h') =>
  jwt.sign(
    {
      id,
      email,
    },
    config.jwtSecretKey,
    { expiresIn }
  );
f;

module.exports = {
  generateJWT,
};
