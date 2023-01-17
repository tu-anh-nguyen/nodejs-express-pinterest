const { SugarError } = require('../../helpers/errors');
const { Image } = require('../../models');

module.exports = async ({ userId, name, url, description }) => {
  try {
    const image = await Image.create({ userId, name, url, description });
    return image;
  } catch (error) {
    throw new SugarError(error);
  }
};
