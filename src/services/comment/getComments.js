const { SugarError } = require('../../helpers/errors');
const { Comment } = require('../../models');

module.exports = async (params) => {
  const limit = +params.limit || 10;
  const offset = +params.offset || 0;
	try {
		const comments = await Comment.findAll({
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
