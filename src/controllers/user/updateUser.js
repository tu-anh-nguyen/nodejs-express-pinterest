const resp = require('../../helpers/response');
const userServices = require('../../services/user');

module.exports = async (req, res, next) => {
	const { id } = req.params;
	const args = req.body;
	try {
		const user = await userServices.updateUser(id, args);
		resp({
			res,
			data: user,
		});
	} catch (error) {
		next(error);
	}
};
