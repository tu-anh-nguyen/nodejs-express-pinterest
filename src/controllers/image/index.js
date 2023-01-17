const imageControllers = {
  createImage: require('./createImage'),
  getImages: require('./getImages'),
  findImageById: require('./findImageById'),
  updateImage: require('./updateImage'),
  deleteImage: require('./deleteImage'),
  getSavedStatus: require('./getSavedStatus'),
  getCommentsByImageId: require('./getCommentsByImageId'),
};

module.exports = imageControllers;
