const resp = require('../../helpers/response');
const userServices = require('../../services/user');

module.exports = async (req, res, next) => {
  const args = req.body;
  const { userId } = req;
  try {
    const user = await userServices.updateUser(userId, args);
    resp({
      res,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
