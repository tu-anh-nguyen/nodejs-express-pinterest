const resp = require('../../helpers/response');
const userServices = require('../../services/user');

module.exports = async (req, res, next) => {
  const { limit, offset } = req.query;
  const { userId } = req;
  try {
    const createdImages = await userServices.getCreatedImages({
      limit,
      offset,
      userId,
    });
    resp({
      res,
      data: createdImages,
    });
  } catch (error) {
    next(error);
  }
};
