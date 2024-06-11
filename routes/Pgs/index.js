const router = require('express').Router();
const postRouter = require('./post');
const toolRouter = require('./tool');
const userRouter = require('./user');

router.use('/post', postRouter);
router.use('/tool', toolRouter);
router.use('/user', userRouter);

module.exports = router;