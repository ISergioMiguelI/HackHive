const bcrypt = require('bcryptjs');
const authenticateUtil = require('../../utils/authenticate.js');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Email:', email, 'Password:', password); // Debug

        const user = await prisma.Utilizador.findUnique({
            where: { email: email },
        });

        if (user) {
            console.log('User found:', user); // Debug
            const passwordIsValid = bcrypt.compareSync(password, user.password);
            if (passwordIsValid) {
                const role = user.isAdmin ? 'admin' : 'user';
                const payload = { 
                    id: user.id_utilizador, 
                    name: user.name, 
                    email: user.email,
                    isAdmin: user.isAdmin 
                };
                console.log('Token Payload:', payload); // Debug

                const accessToken = authenticateUtil.generateAccessToken(payload);
                res.status(200).json({ nome: user.name, email: user.email, token: accessToken, role: role });
            } else {
                console.log('Invalid password'); // Debug
                res.status(401).json({ msg: "Invalid password!" });
            }
        } else {
            console.log('User not found'); // Debug
            res.status(401).json({ msg: "User not found!" });
        }
    } catch (error) {
        console.error('Error in signin:', error); // Debug
        res.status(500).json({ msg: "Internal server error" });
    }
};

// Endpoint para Sign Up
exports.signup = async (req, res) => {
    const { name, email, password, isAdmin } = req.body;

    console.log({ name, email, password, isAdmin });

    // Validação dos campos necessários
    if (!name || !email || !password) {
        return res.status(400).json({ msg: "All fields are required." });
    }

    try {
        // Verifica se o email já está em uso
        const existingUser = await prisma.Utilizador.findUnique({
            where: { email: email },
        });

        if (existingUser) {
            return res.status(400).json({ msg: "Email already in use." });
        }

        // Cria um novo usuário
        const utilizador = await prisma.Utilizador.create({
            data: {
                name: name,
                email: email,
                password: bcrypt.hashSync(password, 8),
                isAdmin: isAdmin
            },
        });

        // Retorna o usuário criado
        res.status(201).json(utilizador);
    } catch (error) {
        console.error('Signup Error:', error);
        res.status(400).json({ msg: error.message });
    }
};

// Endpoint para Leitura de Token
exports.readToken = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ msg: 'Token is required' });
        }

        // Decodifica o token
        const decoded = await authenticateUtil.certifyAccessToken(token);

        const id_utilizador = decoded.id_utilizador;
        const name = decoded.nome;
        const email = decoded.email;
        const isAdmin = decoded.isAdmin ? 'admin' : 'user';

        // Responde com os dados do usuário
        res.status(200).json({ id_utilizador, name, email, isAdmin });
    } catch (error) {
        console.error('ReadToken Error:', error);
        res.status(401).json({ msg: error.message });
    }
};
