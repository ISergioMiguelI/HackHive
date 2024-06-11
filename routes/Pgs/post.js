const postrouter = require('express').Router();
const controller = require('../../controllers/Pgs/post');

postrouter.get('/posts', controller.getPosts);
postrouter.get('/posts/:id', controller.getPostById);
postrouter.post('/posts',  controller.createPost);
postrouter.put('/posts/:id',  controller.updatePost);
postrouter.delete('/posts/:id',  controller.deletePost);

module.exports = postrouter;
