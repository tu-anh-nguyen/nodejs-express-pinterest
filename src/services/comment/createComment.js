const { SugarError } = require('../../helpers/errors');
const { Comment } = require('../../models');

module.exports = async ({ userId, imageId, content }) => {
  try {
    const comment = await Comment.create({ userId, imageId, content });
    return comment;
  } catch (error) {
    throw new SugarError(error);
  }
};
