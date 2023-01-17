const resp = require('../../helpers/response');
const imageServices = require('../../services/image');

module.exports = async (req, res, next) => {
	const { id } = req.params;
	try {
		const image = await imageServices.findImageById(id);
		resp({
			res,
			data: image,
		});
	} catch (error) {
		next(error);
	}
};
