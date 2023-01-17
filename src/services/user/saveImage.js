const { SugarError } = require('../../helpers/errors');
const { User, Image } = require('../../models');
const { ErrUserNotFound, ErrImageNotFound } = require('../../pkg/appError');

module.exports = async ({ userId, imageId }) => {
  try {
    const user = await User.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new SugarError(ErrUserNotFound);
    }

    const image = await Image.findOne({
      where: { id: imageId },
    });
    if (!image) {
      throw new SugarError(ErrImageNotFound);
    }

    const hasSaved = await user.hasSavedImage(imageId);
    if (hasSaved) {
      await user.removeSavedImage(imageId);
      return 'unsaved';
    } else {
      await user.addSavedImage(imageId);
      return 'saved';
    }
  } catch (error) {
    throw new SugarError(error);
  }
};
