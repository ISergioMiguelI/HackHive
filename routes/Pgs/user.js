const routeruser = require('express').Router();
const { check } = require('express-validator');
const { verifyOldPassword, resetPassword, getUsers, getUserById, createUser, updateUser, deleteUser } = require('../../controllers/Pgs/Users');

// Rotas existentes
routeruser.get('/users', getUsers);
routeruser.get('/users/:id', getUserById);
routeruser.post('/register', createUser);
routeruser.put('/users/:id', updateUser);
routeruser.delete('/users/:id', deleteUser);

// Novas rotas
routeruser.post('/verify-old-password', verifyOldPassword);
routeruser.post('/recover-password', resetPassword);

module.exports = routeruser;
