const userController = require('../../controllers/user');
const router = require('express').Router();
const authorize = require('../../middlewares/authorize');

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.findUserById);
router.put('/:id', authorize, userController.updateUser);
router.delete('/:id', authorize, userController.deleteUser);

module.exports = router;
