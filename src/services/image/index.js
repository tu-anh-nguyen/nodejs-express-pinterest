const imageServices = {
  createImage: require('./createImage'),
  getImages: require('./getImages'),
  findImageById: require('./findImageById'),
  getSavedStatus: require('./getSavedStatus'),
  updateImage: require('./updateImage'),
  deleteImage: require('./deleteImage'),
  getCommentsByImageId: require('./getCommentsByImageId'),
};

module.exports = imageServices;
