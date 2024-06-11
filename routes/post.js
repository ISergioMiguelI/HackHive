

const express = require('express');
const router = express.Router();
const postsController = require('../controllers/post');
const { authenticateToken } = require('../auth');

router.get('/posts', authenticateToken, postsController.getPosts);
router.get('/posts/:id', authenticateToken, postsController.getPostById);
router.post('/posts', authenticateToken, postsController.createPost);
router.put('/posts/:id', authenticateToken, postsController.updatePost);
router.delete('/posts/:id', authenticateToken, postsController.deletePost);

module.exports = router;
