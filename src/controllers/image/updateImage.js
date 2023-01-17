const resp = require('../../helpers/response');
const imageServices = require('../../services/image');

module.exports = async (req, res, next) => {
	const { id } = req.params;
	const args = req.body;
	try {
		const image = await imageServices.updateImage(id, args);
		resp({
			res,
			data: image,
		});
	} catch (error) {
		next(error);
	}
};
