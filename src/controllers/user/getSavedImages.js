const resp = require('../../helpers/response');
const userServices = require('../../services/user');

module.exports = async (req, res, next) => {
  const { limit, offset } = req.query;
  const { userId } = req;
  try {
    const savedImages = await userServices.getSavedImages({
      limit,
      offset,
      userId,
    });
    resp({
      res,
      data: savedImages,
    });
  } catch (error) {
    next(error);
  }
};
