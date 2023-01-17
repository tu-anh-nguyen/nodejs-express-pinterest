const resp = require('../../helpers/response');
const commentServices = require('../../services/comment');

module.exports = async (req, res, next) => {
  const { content, imageId } = req.body;
  const { userId } = req;
  try {
    const comment = await commentServices.createComment({
      userId,
      imageId,
      content,
    });
    resp({
      res,
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};
