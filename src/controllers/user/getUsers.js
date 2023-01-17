const resp = require('../../helpers/response');
const userServices = require('../../services/user');

module.exports = async (req, res, next) => {
  const { limit, offset } = req.query;

  try {
    const user = await userServices.getUsers({ limit, offset });
    resp({
      res,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
