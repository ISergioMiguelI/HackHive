const { PrismaClient } = require('@prisma/client');
const { validationResult } = require('express-validator');
const prisma = new PrismaClient();

exports.getPosts = async (req, res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                author: true
            }
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
};

exports.getPostById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const post = await prisma.post.findUnique({
            where: { id },
            include: {
                author: true
            }
        });
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error: error.message });
    }
};

exports.createPost = async (req, res) => {
    const { title, content, email } = req.body;

    try {
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                author: { 
                    connect: { email }
                }
            }
        });
        res.status(201).json(newPost);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
};

exports.updatePost = async (req, res) => {
    const id = parseInt(req.params.id);
    const { title, content } = req.body;
    try {
        const updatedPost = await prisma.post.update({
            where: { id },
            data: { title, content }
        });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error updating post', error: error.message });
    }
};

exports.deletePost = async (req, res) => {
    const postId = parseInt(req.params.id);
    try {
        await prisma.post.delete({ where: { id: postId } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
};
