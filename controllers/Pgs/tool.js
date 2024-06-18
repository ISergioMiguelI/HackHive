const Tool = require('../../utils/tool');

exports.getTools = async (req, res) => {
    try {
        const tools = await Tool.find();
        res.status(200).json(tools);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getToolById = async (req, res) => {
    try {
        const tool = await Tool.findById(req.params.id);
        if (tool) {
            res.status(200).json(tool);
        } else {
            res.status(404).json({ message: 'Tool not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createTool = async (req, res) => {
    const { name, description, url } = req.body;
    const newTool = new Tool({ name, description, url });
    try {
        const savedTool = await newTool.save();
        res.status(201).json(savedTool);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateTool = async (req, res) => {
    try {
        const updatedTool = await Tool.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedTool) {
            res.status(200).json(updatedTool);
        } else {
            res.status(404).json({ message: 'Tool not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteTool = async (req, res) => {
    try {
        const deletedTool = await Tool.findByIdAndDelete(req.params.id);
        if (deletedTool) {
            res.status(200).json({ message: 'Tool deleted successfully' });
        } else {
            res.status(404).json({ message: 'Tool not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
