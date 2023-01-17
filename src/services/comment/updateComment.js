const { SugarError } = require('../../helpers/errors');
const { Comment, User } = require('../../models');
const { ErrCommentNotFound, ErrUserNotFound } = require('../../pkg/appError');

module.exports = async (id, userId, args) => {
  try {
    const comment = await Comment.findOne({ where: { id } });

    if (!comment) {
      throw new SugarError(ErrCommentNotFound);
    }

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      throw new SugarError(ErrUserNotFound);
    }

    comment.set(args);
    await comment.save();

    return comment;
  } catch (error) {
    throw new SugarError(error);
  }
};
