const resp = require('../../helpers/response');
const commentServices = require('../../services/comment');

module.exports = async (req, res, next) => {
	const { id } = req.params;
	try {
		const comment = await commentServices.findCommentById(id);
		resp({
			res,
			data: comment,
		});
	} catch (error) {
		next(error);
	}
};
