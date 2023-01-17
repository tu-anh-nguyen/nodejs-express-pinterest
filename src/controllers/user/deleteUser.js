const resp = require('../../helpers/response');
const userServices = require('../../services/user');

module.exports = async (req, res, next) => {
	const { id } = req.params;
	try {
		const user = await userServices.deleteUser(id);
		resp({
			res,
			data: user,
		});
	} catch (error) {
		next(error);
	}
};
