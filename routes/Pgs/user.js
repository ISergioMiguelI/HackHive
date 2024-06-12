const routeruser = require('express').Router();
const { check } = require('express-validator'); 
const controller = require('../../controllers/Pgs/user');

routeruser.get('/users',  controller.getUsers);
routeruser.get('/users/:id',  controller.getUserById);
routeruser.post('/register', controller.createUser);
routeruser.put('/users/:id',  controller.updateUser);
routeruser.delete('/users/:id',  controller.deleteUser);

module.exports = routeruser;
