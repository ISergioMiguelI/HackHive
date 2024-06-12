const routeruser = require('express').Router();
const { check } = require('express-validator'); // Adicione esta linha
const controller = require('../../controllers/Pgs/user');

routeruser.get('/users',  controller.getUsers);
routeruser.get('/users/:id',  controller.getUserById);
routeruser.post('/register', controller.createUser);
routeruser.put('/users/:id',  controller.updateUser);
routeruser.delete('/users/:id',  controller.deleteUser);

routeruser.get('/', controller.getUsers);
routeruser.get('/:id', controller.getUserById);
routeruser.post('/register', 
  [
    check('name').notEmpty().withMessage('Name is required'),
    check('email').isEmail().withMessage('Valid email is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ], 
  controller.createUser
);
routeruser.put('/:id', controller.updateUser);
routeruser.delete('/:id', controller.deleteUser);

module.exports = routeruser;
