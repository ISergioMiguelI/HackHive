const express = require('express');
const toolRouter = express.Router();
const toolController = require('../../controllers/Pgs/tool');

toolRouter.get('/tool', toolController.getTools);
toolRouter.get('/tool/:id', toolController.getToolById);
toolRouter.post('/tool', toolController.createTool);
toolRouter.put('/tool/:id', toolController.updateTool);
toolRouter.delete('/tool/:id', toolController.deleteTool);

module.exports = toolRouter;
