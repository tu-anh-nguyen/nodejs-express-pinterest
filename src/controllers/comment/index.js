const commentControllers = {
	createComment: require('./createComment'),
	getComments: require('./getComments'),
	findCommentById: require('./findCommentById'),
	updateComment: require('./updateComment'),
	deleteComment: require('./deleteComment'),
};

module.exports = commentControllers;
