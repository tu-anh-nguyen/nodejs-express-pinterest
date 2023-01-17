const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../config');
const { SugarError } = require('../../helpers/errors');
const { User } = require('../../models');
const { ErrLogin } = require('../../pkg/appError');
const { generateJWT } = require('../../helpers/jwt');
module.exports = async ({ email, password }) => {
  try {
    const user = await User.findOne({
      where: { email },
      attributes: {
        include: ['password'],
      },
    });

    if (!user) {
      throw new SugarError(ErrLogin);
    }

    const isMatchedPassword = bcrypt.compare(password, user.password);

    if (!isMatchedPassword) {
      throw new SugarError(ErrLogin);
    }
    delete user.dataValues.password;

    const jwtData = { userId: user.id, userRoles: user.roles };
    const accessToken = generateJWT(jwtData, 60 * 60 * 24);
    const refreshToken = generateJWT(jwtData, 60 * 60 * 24 * 30);

    return { profile: user, accessToken, refreshToken };
  } catch (error) {
    throw new SugarError(error);
  }
};
