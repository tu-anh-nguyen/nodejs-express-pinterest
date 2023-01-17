const resp = require('../../helpers/response');
const imageServices = require('../../services/image');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req;
  try {
    const image = await imageServices.deleteImage({ id, userId });
    resp({
      res,
      data: image,
    });
  } catch (error) {
    next(error);
  }
};
