    const { PrismaClient } = require('@prisma/client');
    const { validationResult } = require('express-validator');
    const bcrypt = require('bcryptjs');
    const prisma = new PrismaClient();
    const { generateToken } = require('../../utils/authenticate');

    exports.getAll = async (req, res) => {
        try {
            console.log("Iniciando a busca por todos os usuários"); // Log para depuração
    
            // Read all records from the 'Utilizador' table
            const response = await prisma.User.findMany();
            console.log("Busca concluída com sucesso"); // Log para depuração
    
            res.status(200).json(response); // Send the response with status 200 (OK)
        } catch (error) {
            console.error("Erro ao buscar todos os usuários:", error); // Log detalhado do erro
            res.status(500).json({ msg: error.message }); // Send error message with status 500 (Internal Server Error)
        }
    }

    exports.getById = async (req, res) => {
    // Get the ID from the request parameters
    const id = req.params.id * 1;
    try {
        // Find the user with the given ID
        const response = await prisma.Utilizador.findUnique({
            where: {
                id_utilizador: id,
            },
        });
        // Send the user with status 200 (OK)
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({ msg: error.message }); // Send error message with status 404 (Not Found)
    }
    }


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

    const { name, email, password, isAdmin, } = req.body;

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

    exports.login = async (req, res) => {
        // Get the email and password from the request body
        const { email, password } = req.body;
    
        try {
            // Find user by email
            const user = await prisma.Utilizador.findUnique({
                where: { email: email },
            });
    
            if (!user) {
                return res.status(400).json({ msg: "Invalid credentials" });
            }
    
            // Check if the password matches
            if (password !== user.password) {
                return res.status(400).json({ msg: "Invalid credentials" });
            }
    
            // Return success with user role
            res.status(200).json({ msg: "Login successful", role: user.isAdmin ? 'admin' : 'user' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ msg: "An error occurred. Please try again later." }); // Send error message with status 500 (Internal Server Error)
        }
    }

    exports.deleteUser = async (req, res) => {
    const userId = parseInt(req.params.id);

    await prisma.user.delete({
        where: { id: userId },
    });

    res.status(204).send();
    };

    exports.forgotpassword = async (req, res) => {
    // Get the data from the request body
    const { email } = req.body;

    try {
        // Find the user by ID and update with new data
        const utilizador = await prisma.Utilizador.findUnique({
            where: {
                email: email,
            },
        });
        // Send the updated user with status 200 (OK)
        res.status(200).json(utilizador);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
    }

    exports.resetpassword = async (req, res) => {
    // Get the data from the request body
    const { id_utilizador, password } = req.body;

    try {
        // Find the user by ID and update with new data
        const utilizador = await prisma.Utilizador.update({
            where: {
                id_utilizador: id_utilizador,
            },
            data: {
                password,
            },
        });
        // Send the updated user with status 200 (OK)
        res.status(200).json(utilizador);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
    }

    exports.changepassword = async (req, res) => {
    // Get the data from the request body
    const { id_utilizador, password } = req.body;

    try {
        // Find the user by ID and update with new data
        const utilizador = await prisma.Utilizador.update({
            where: {
                id_utilizador: id_utilizador,
            },
            data: {
                password,
            },
        });
        // Send the updated user with status 200 (OK)
        res.status(200).json(utilizador);
    } catch (error) {
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
    }
