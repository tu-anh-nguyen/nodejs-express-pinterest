const { SugarError } = require('../../helpers/errors');
const { User } = require('../../models');
const { ErrUserNotFound } = require('../../pkg/appError');

module.exports = async (id) => {
	try {
		const user = await User.findOne({ where: { id } });

		if (!user) {
      throw new SugarError(ErrUserNotFound);
		}
	
		await User.destroy({ where: { id } });
		return true;
	} catch (error) {
		throw new SugarError(error);
	}
};
