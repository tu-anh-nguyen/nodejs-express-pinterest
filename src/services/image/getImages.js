const { SugarError } = require('../../helpers/errors');
const { Image } = require('../../models');

module.exports = async (params) => {
  const limit = +params.limit || 10;
  const offset = +params.offset || 0;
  try {
    const images = await Image.findAll({
      limit: limit + 1,
      offset,
    });

    const total = await Image.count();
    let nextPaging = null;

    if (images.length > limit) {
      nextPaging = { limit, offset: offset + limit };
      images.pop();
    }

    return { images, nextPaging, total };
  } catch (error) {
    throw new SugarError(error);
  }
};
