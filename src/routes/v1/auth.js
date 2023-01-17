const authController = require('../../controllers/auth');
const router = require('express').Router();
const authorize = require('../../middlewares/authorize');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/update-profile', authorize, authController.updateProfile);

module.exports = router;
