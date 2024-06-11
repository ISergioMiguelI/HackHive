const express = require('express');
const router = express.Router();
const toolsController = require('../controllers/tool');
const { authenticateToken } = require('../auth');

router.get('/tools', authenticateToken, toolsController.getTools);
router.get('/tools/:id', authenticateToken, toolsController.getToolById);
router.post('/tools', authenticateToken, toolsController.createTool);
router.put('/tools/:id', authenticateToken, toolsController.updateTool);
router.delete('/tools/:id', authenticateToken, toolsController.deleteTool);

module.exports = router;