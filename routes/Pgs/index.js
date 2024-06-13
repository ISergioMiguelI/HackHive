const router = require('express').Router();
const postRouter = require('./post');
const toolRouter = require('./tool');
const userRouter = require('./user');
const autenticationRouter = require('./Auth');

router.use('/post', postRouter);
router.use('/tool', toolRouter);
router.use('/user', userRouter);
router.use('/Auth', autenticationRouter);

module.exports = router;