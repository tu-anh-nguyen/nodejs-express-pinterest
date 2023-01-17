const router = require('express').Router();

const userRouter = require('./user');
router.use('/users', userRouter);

const authRouter = require('./auth');
router.use('/auth', authRouter);

const imageRouter = require('./image');
router.use('/images', imageRouter);

const commentRouter = require('./comment');
router.use('/comments', commentRouter);

module.exports = router;
