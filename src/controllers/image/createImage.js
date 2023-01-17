const config = require('../../config');
const resp = require('../../helpers/response');
const imageServices = require('../../services/image');

module.exports = async (req, res, next) => {
  const file = req.file;
  if (!file) {
    next(new SugarError(ErrNoFileSelected));
  }

  try {
    const url = config.domain + '/' + file.path;
    const name = file.filename;
    const { userId } = req;
    const args = {
      url,
      name,
      userId,
    };
    const image = await imageServices.createImage(args);
    resp({
      res,
      data: image,
    });
  } catch (error) {
    next(error);
  }
};
