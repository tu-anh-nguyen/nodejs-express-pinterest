const userControllers = {
	createUser: require('./createUser'),
	getUsers: require('./getUsers'),
	findUserById: require('./findUserById'),
	updateUser: require('./updateUser'),
	deleteUser: require('./deleteUser'),
	saveImage: require('./saveImage'),
  getSavedImages: require('./getSavedImages'),
  getCreatedImages: require('./getCreatedImages'),
};

module.exports = userControllers;
