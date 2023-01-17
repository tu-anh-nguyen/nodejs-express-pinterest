const { SugarError } = require('../../helpers/errors');
const { Image } = require('../../models');
const { ErrImageNotFound } = require('../../pkg/appError');

module.exports = async (id) => {
  try {
    const image = await Image.findOne({
      where: { id },
      attributes: {
        exclude: ['userId'],
      },
      include: {
        association: 'createdBy',
        attributes: {
          exclude: ['password'],
        },
      },
    });

    if (!image) {
      throw new SugarError(ErrImageNotFound);
    }

    return image;
  } catch (error) {
    throw new SugarError(error);
  }
};
