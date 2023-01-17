const router = require('express').Router();

const userRouter = require('./user');
router.use('/users', userRouter);

const authRouter = require('./auth');
router.use('/auth', authRouter);

module.exports = router;
