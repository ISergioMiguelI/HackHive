const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getPosts = async (req, res) => {
  const posts = await prisma.post.findMany({ include: { author: true } });
  res.json(posts);
};

exports.getPostById = async (req, res) => {
  const postId = parseInt(req.params.id);
  const post = await prisma.post.findUnique({ where: { id: postId }, include: { author: true } });
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};

exports.createPost = async (req, res) => {
  const { title, content, authorId } = req.body;

  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId,
    },
  });

  res.status(201).json(post);
};

exports.updatePost = async (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, content } = req.body;

  const post = await prisma.post.update({
    where: { id: postId },
    data: { title, content },
  });

  res.json(post);
};

exports.deletePost = async (req, res) => {
  const postId = parseInt(req.params.id);

  await prisma.post.delete({
    where: { id: postId },
  });

  res.status(204).send();
};