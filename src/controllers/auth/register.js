const resp = require('../../helpers/response');
const userServices = require('../../services/user');

module.exports = async (req, res, next) => {
  const { email, fullName, age, password, avatar } = req.body;
  try {
    const user = await userServices.createUser({
      email,
      fullName,
      age,
      password,
      avatar,
    });
    resp({
      res,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
