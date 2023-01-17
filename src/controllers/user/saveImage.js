const resp = require('../../helpers/response');
const userServices = require('../../services/user');

module.exports = async (req, res, next) => {
  const { imageId } = req.body;
  const { userId } = req;
  try {
    const user = await userServices.saveImage({ userId, imageId });
    resp({
      res,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
