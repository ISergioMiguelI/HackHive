const { PrismaClient } = require('@prisma/client');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();
const { generateToken } = require('../../utils/auth');

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

  const { name, email, password } = req.body;

  try {
      // Verifica se o e-mail já está registrado
      const existingUser = await prisma.user.findUnique({
          where: { email: email },
      });

      if (existingUser) {
          return res.status(400).json({ error: 'E-mail já registrado' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await prisma.user.create({
          data: {
              name: name,
              email: email,
              password: hashedPassword,
          },
      });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ token, userId: user.id });
  } catch (error) {
      res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
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

exports.deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id);

  await prisma.user.delete({
    where: { id: userId },
  });

  res.status(204).send();
};
