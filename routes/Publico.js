const publicRouter = require('express').Router();

publicRouter.get('/', (req, res) => {
    res.sendFile('C:/Users/azar0/Documents/GitHub/HACKHIVE/Pages/index.html');
});

module.exports = publicRouter;