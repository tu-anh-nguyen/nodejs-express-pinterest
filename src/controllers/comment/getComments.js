const resp = require('../../helpers/response');
const commentServices = require('../../services/comment');

module.exports = async (req, res, next) => {
  const { limit, offset } = req.query;
	try {
		const comment = await commentServices.getComments({ limit, offset });
		resp({
			res,
			data: comment,
		});
	} catch (error) {
		next(error);
	}
};
