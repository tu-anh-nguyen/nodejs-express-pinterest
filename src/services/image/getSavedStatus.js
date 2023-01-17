const { SugarError } = require('../../helpers/errors');
const { Image } = require('../../models');
const { ErrImageNotFound } = require('../../pkg/appError');

module.exports = async ({ id, userId }) => {
  try {
    const image = await Image.findOne({
      where: { id },
    });

    if (!image) {
      throw new SugarError(ErrImageNotFound);
    }

    const hasSaved = await image.hasUserSaved(userId);
    return hasSaved;
  } catch (error) {
    throw new SugarError(error);
  }
};
