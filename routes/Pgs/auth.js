const autenticationRouter = require('express').Router();
const controller = require('../../controllers/Pgs/auth');

autenticationRouter.post('/signin', controller.signin);
autenticationRouter.post('/signup', controller.signup);
autenticationRouter.post('/readToken', controller.readToken);

module.exports = autenticationRouter;