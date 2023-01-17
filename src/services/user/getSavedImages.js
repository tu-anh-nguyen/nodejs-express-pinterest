const { SugarError } = require('../../helpers/errors');
const { SavedImage } = require('../../models');
const R = require('ramda');

module.exports = async (params) => {
  const limit = +params.limit || 10;
  const offset = +params.offset || 0;
  try {
    const images = await SavedImage.findAll({
      where: { userId: params.userId },
      limit: limit + 1,
      offset,
    });
    
    const total = await SavedImage.count({
      where: { userId: params.userId },
    });
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
