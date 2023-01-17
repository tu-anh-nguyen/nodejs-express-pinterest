const commentController = require('../../controllers/comment');
const router = require('express').Router();
const authorize = require('../../middlewares/authorize');

router.post('/', authorize, commentController.createComment);
router.get('/', commentController.getComments);
router.get('/:id', commentController.findCommentById);
router.put('/:id', authorize, commentController.updateComment);
router.delete('/:id', authorize, commentController.deleteComment);

module.exports = router;
