const { SugarError } = require('../../helpers/errors');
const { Comment, Image } = require('../../models');
const { ErrImageNotFound } = require('../../pkg/appError');

module.exports = async ({ limit: _limit, offset: _offset, imageId }) => {
  const limit = +_limit || 10;
  const offset = +_offset || 0;
  try {
    const image = await Image.findOne({
      where: { id: imageId },
    });

    if (!image) {
      throw new SugarError(ErrImageNotFound);
    }

    const comments = await Comment.findAll({
      where: { imageId },
      limit: limit + 1,
      offset,
    });

    const total = await Comment.count();
    let nextPaging = null;

    if (comments.length > limit) {
      nextPaging = { limit, offset: offset + limit };
      comments.pop();
    }

    return { comments, nextPaging, total };
  } catch (error) {
    throw new SugarError(error);
  }
};
