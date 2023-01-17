const { SugarError } = require('../../helpers/errors');
const { Comment } = require('../../models');
const { ErrCommentNotFound } = require('../../pkg/appError');

module.exports = async (id) => {
	try {
		const comment = await Comment.findOne({ where: { id } });

		if (!comment) {
      throw new SugarError(ErrCommentNotFound);
		}

		return comment;
	} catch (error) {
		throw new SugarError(error);
	}
};
