const { SugarError } = require('../../helpers/errors');
const { User } = require('../../models');
const { ErrAccountExisted } = require('../../pkg/appError');

module.exports = async ({ email, fullName, age, password, avatar }) => {
  try {
    const existedUser = await User.findOne({ where: { email } });

    if (existedUser) {
      throw new SugarError(ErrAccountExisted);
    }

    const user = await User.create({ email, fullName, age, password, avatar });

    return user;
  } catch (error) {
    throw new SugarError(error);
  }
};
