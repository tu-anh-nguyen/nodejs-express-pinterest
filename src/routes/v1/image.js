const imageController = require('../../controllers/image');
const router = require('express').Router();
const upload = require('../../middlewares/upload');
const authorize = require('../../middlewares/authorize');

router.post(
  '/',
  authorize,
  upload.single('image'),
  imageController.createImage
);
router.get('/', imageController.getImages);
router.get('/:id', imageController.findImageById);
router.put('/:id', authorize, imageController.updateImage);
router.delete('/:id', authorize, imageController.deleteImage);
router.get('/:id/status', authorize, imageController.getSavedStatus);
router.get('/:id/comments', imageController.getCommentsByImageId);

module.exports = router;
