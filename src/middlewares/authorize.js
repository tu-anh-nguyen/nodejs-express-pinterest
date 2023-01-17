const { SugarError } = require('../helpers/errors');
const { ErrUnauthenticated } = require('../pkg/appError');
const jwt = require('jsonwebtoken');
const config = require('../config');
const { User } = require('../models');

const authorize = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization || ''; // Bearer abcxyz
    const parts = bearerToken.split(' ') || []; // ["Bearer", "abcxyz"]

    if (parts.length !== 2 || parts[0] !== 'Bearer' || !parts[1].trim()) {
      throw new SugarError(ErrUnauthenticated);
    }

    const decoded = jwt.verify(parts[1], config.jwtSecretKey);

    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) {
      throw new SugarError(ErrUnauthenticated);
    }

    req.userId = decoded.id;
    req.restaurantIds = decoded.restaurantIds;
    next();
  } catch (error) {
    // Do là async nên phải dùng next để error middleware handle,
    // ngược lại sync thì có thẻ dùng throw
    if (error instanceof jwt.JsonWebTokenError) {
      error.code = ErrUnauthenticated.code;
      error.statusCode = ErrUnauthenticated.statusCode;
      next(new SugarError(error));
    }
    next(error);
  }
};

module.exports = authorize;
