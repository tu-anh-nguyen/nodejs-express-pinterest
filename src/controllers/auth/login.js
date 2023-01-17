const resp = require('../../helpers/response');
const authServices = require('../../services/auth');

module.exports = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await authServices.login({ email, password });
    resp({
      res,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
