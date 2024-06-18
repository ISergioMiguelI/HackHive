const { PrismaClient } = require('@prisma/client');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const prisma = new PrismaClient();
const { generateToken } = require('../../utils/authenticate');

exports.getById = async (req, res) => {
    const id = req.params.id * 1;
    try {
        const response = await prisma.Utilizador.findUnique({
            where: { id_utilizador: id },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message });
    }
};

exports.getUsers = async (req, res) => {
    const users = await prisma.user.findMany();
    res.json(users);
};

exports.getUserById = async (req, res) => {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

exports.createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, isAdmin } = req.body;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return res.status(400).json({ error: 'E-mail already registered' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword, isAdmin },
        });

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, userId: user.id });
    } catch (error) {
        res.status(500).json({ error: 'Error creating User', details: error.message });
    }
};

exports.updateUser = async (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;

    const user = await prisma.user.update({
        where: { id: userId },
        data: { name, email },
    });

    res.json(user);
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.Utilizador.findUnique({ where: { email } });

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = generateToken(user.id);

        res.status(200).json({ token, role: user.isAdmin ? 'admin' : 'user' });
    } catch (error) {
        res.status(500).json({ msg: 'An error occurred. Please try again later.' });
    }
};

exports.deleteUser = async (req, res) => {
    const userId = parseInt(req.params.id);

    await prisma.user.delete({ where: { id: userId } });

    res.status(204).send();
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    await prisma.user.update({
        where: { email },
        data: {
            resetPasswordToken: token,
            resetPasswordExpires: tokenExpiry,
        },
    });

    res.status(200).json({ message: 'Reset link sent to your email' });
};
exports.recoverPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    const user = await prisma.user.findFirst({
        where: {
            resetPasswordToken: token,
            resetPasswordExpires: { gt: new Date() },
        },
    });

    if (!user) {
        return res.status(400).json({ message: 'Token is invalid or has expired' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
        where: { id: user.id },
        data: {
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null,
        },
    });

    res.status(200).json({ message: 'Password has been reset' });
};
