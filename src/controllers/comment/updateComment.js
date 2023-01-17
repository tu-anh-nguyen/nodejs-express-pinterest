const resp = require('../../helpers/response');
const commentServices = require('../../services/comment');

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { userId } = req;
  const args = req.body;
  try {
    const comment = await commentServices.updateComment(id, userId, args);
    resp({
      res,
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};
