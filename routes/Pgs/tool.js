const express = require('express');
const toolRouter = express.Router();
const toolController = require('../../controllers/Pgs/tool');

toolRouter.get('/tools', toolController.getTools);
toolRouter.get('/tools/:id', toolController.getToolById);
toolRouter.post('/tools', toolController.createTool);
toolRouter.put('/tools/:id', toolController.updateTool);
toolRouter.delete('/tools/:id', toolController.deleteTool);



module.exports = toolRouter;
