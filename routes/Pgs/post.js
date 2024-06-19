const postRouter = require('express').Router();
const controller = require('../../controllers/Pgs/post');

postRouter.get('/', controller.getPosts);
postRouter.get('/:id', controller.getPostById);
postRouter.post('/', controller.createPost);
postRouter.put('/:id', controller.updatePost);
postRouter.delete('/:id', controller.deletePost);

module.exports = postRouter;
