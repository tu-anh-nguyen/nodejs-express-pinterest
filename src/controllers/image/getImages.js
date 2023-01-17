const resp = require('../../helpers/response');
const imageServices = require('../../services/image');

module.exports = async (req, res, next) => {
  const { limit, offset } = req.query;
	try {
		const image = await imageServices.getImages({ limit, offset });
		resp({
			res,
			data: image,
		});
	} catch (error) {
		next(error);
	}
};
