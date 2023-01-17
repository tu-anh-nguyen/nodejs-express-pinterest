const resp = require('../../helpers/response');
const imageServices = require('../../services/image');

module.exports = async (req, res, next) => {
  const { limit, offset } = req.query;
  const { id: imageId } = req.params;
  try {
    const comment = await imageServices.getCommentsByImageId({
      limit,
      offset,
      imageId,
    });
    resp({
      res,
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};
