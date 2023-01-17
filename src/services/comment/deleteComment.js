const { SugarError } = require('../../helpers/errors');
const { Comment, User } = require('../../models');
const {
  ErrCommentNotFound,
  ErrUserNotFound,
  ErrPermissionDenied,
} = require('../../pkg/appError');

module.exports = async ({ id, userId }) => {
  try {
    const comment = await Comment.findOne({ where: { id } });

    if (!comment) {
      throw new SugarError(ErrCommentNotFound);
    }

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      throw new SugarError(ErrUserNotFound);
    }

    if (userId !== comment.dataValues.userId) {
      throw new SugarError(ErrPermissionDenied);
    }

    await Comment.destroy({ where: { id } });
    return true;
  } catch (error) {
    throw new SugarError(error);
  }
};
