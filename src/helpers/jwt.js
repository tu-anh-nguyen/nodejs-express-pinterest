const jwt = require('jsonwebtoken');
const config = require('../config');

const generateJWT = ({ userId, userRoles }, expiresIn = '24h') =>
  jwt.sign(
    {
      userId,
      userRoles,
    },
    config.jwtSecretKey,
    { expiresIn }
  );

module.exports = {
  generateJWT,
};
