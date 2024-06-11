const toolrouter = require('express').Router();
const controller = require('../../controllers/Pgs/tool');

toolrouter.get('/tools',  controller.getTools);
toolrouter.get('/tools/:id',  controller.getToolById);
toolrouter.post('/tools',  controller.createTool);
toolrouter.put('/tools/:id',  controller.updateTool);
toolrouter.delete('/tools/:id',  controller.deleteTool);

module.exports = toolrouter;