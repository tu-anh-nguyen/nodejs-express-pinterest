const resp = require('../../helpers/response');
const commentServices = require('../../services/comment');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req;
  try {
    const comment = await commentServices.deleteComment({ id, userId });
    resp({
      res,
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};
