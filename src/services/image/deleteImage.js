const { SugarError } = require('../../helpers/errors');
const { Image, User } = require('../../models');
const {
  ErrImageNotFound,
  ErrUserNotFound,
  ErrPermissionDenied,
} = require('../../pkg/appError');

module.exports = async ({ id, userId }) => {
  try {
    const image = await Image.findOne({ where: { id } });

    if (!image) {
      throw new SugarError(ErrImageNotFound);
    }
    
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      throw new SugarError(ErrUserNotFound);
    }

    if (userId !== image.dataValues.userId) {
      throw new SugarError(ErrPermissionDenied);
    }

    await Image.destroy({ where: { id } });
    return true;
  } catch (error) {
    throw new SugarError(error);
  }
};
