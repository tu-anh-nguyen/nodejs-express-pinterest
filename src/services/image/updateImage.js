const { SugarError } = require('../../helpers/errors');
const { Image } = require('../../models');
const { ErrImageNotFound } = require('../../pkg/appError');

module.exports = async (id, args) => {
	try {
		const image = await Image.findOne({
      where: {
        id: id,
      },
    });

    if (!image) {
      throw new SugarError(ErrImageNotFound);
    }

    image.set(args);
    await image.save();

		return image;
	} catch (error) {
		throw new SugarError(error);
	}
};
