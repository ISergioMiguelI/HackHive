const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const usersController = require('../controllers/user');
const { authenticateToken } = require('../auth');

router.get('/users', authenticateToken, usersController.getUsers);
router.get('/users/:id', authenticateToken, usersController.getUserById);
router.post('/register', [
  check('name').not().isEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Enter a valid email'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], usersController.createUser);
router.put('/users/:id', authenticateToken, usersController.updateUser);
router.delete('/users/:id', authenticateToken, usersController.deleteUser);

module.exports = router;
