const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getTools = async (req, res) => {
  const tools = await prisma.tool.findMany();
  res.json(tools);
};

exports.getToolById = async (req, res) => {
  const toolId = parseInt(req.params.id);
  const tool = await prisma.tool.findUnique({ where: { id: toolId } });
  if (tool) {
    res.json(tool);
  } else {
    res.status(404).json({ message: 'Tool not found' });
  }
};

exports.createTool = async (req, res) => {
  const { name, description, url } = req.body;

  const tool = await prisma.tool.create({
    data: {
      name,
      description,
      url,
    },
  });

  res.status(201).json(tool);
};

exports.updateTool = async (req, res) => {
  const toolId = parseInt(req.params.id);
  const { name, description, url } = req.body;

  const tool = await prisma.tool.update({
    where: { id: toolId },
    data: { name, description, url },
  });

  res.json(tool);
};

exports.deleteTool = async (req, res) => {
  const toolId = parseInt(req.params.id);

  await prisma.tool.delete({
    where: { id: toolId },
  });

  res.status(204).send();
};