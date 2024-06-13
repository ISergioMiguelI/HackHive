const bcrypt = require('bcryptjs/dist/bcrypt');
const authenticateUtil = require('../../utils/authenticate.js');


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.Utilizador.findUnique({
            where: { email: email },
        });

        if (user) {
            var passwordIsValid = bcrypt.compareSync(password, user.password);
            if (passwordIsValid) {
                const role = user.isAdmin ? 'admin' : 'user';
                
                const payload = { 
                    id: user.id_utilizador, 
                    name: user.name, 
                    email: user.email,
                    isAdmin: user.isAdmin 
                };
                console.log('Token Payload:', payload);

                const accessToken = authenticateUtil.generateAccessToken(payload);

                res.status(200).json({ nome: user.name, email: user.email, token: accessToken, role: role });
            } else {
                res.status(401).json({ msg: "Invalid password!" });
            }
        } else {
            res.status(401).json({ msg: "User not found!" });
        }
    } catch (error) {
        res.status(500).json({ msg: "Internal server error" });
    }
};


exports.signup = async (req, res) => {
    // Get the data from the request body
    const { name, email, password, isAdmin } = req.body;

    console.log({ name, email, password, isAdmin} );

    // Validate required fields
    if (!name || !email || !password) {
        return res.status(400).json({ msg: "All fields are required." });
    }

    try {
        // Check if the email already exists
        const existingUser = await prisma.User.findUnique({
            where: { email: email },
        });

        if (existingUser) {
            return res.status(400).json({ msg: "Email already in use." });
        }

        // Create a new user with the given data
        const utilizador = await prisma.User.create({
            data: {
                name: name,
                email: email,
                password: bcrypt.hashSync(password, 8),
                isAdmin: isAdmin
            },
        });

        // Return the created user with status 201 (Created)
        res.status(201).json(utilizador);
    } catch (error) {
        console.error(error);
        res.status(400).json({ msg: error.message }); // Send error message with status 400 (Bad Request)
    }
}

exports.readToken = async (req, res) => {
    try {
        const { token } = req.body;

        if (!token) {
            return res.status(400).json({ msg: 'Token is required' });
        }

        const decoded = await authenticateUtil.certifyAccessToken(token);

        const id_utilizador = decoded.id_utilizador;
        const name = decoded.nome;
        const email = decoded.email;
        const isAdmin = decoded.isAdmin ? 'admin' : 'user';

        res.status(200).json({ id_utilizador, name, email, isAdmin });
    } catch (error) {
        res.status(401).json({ msg: error.message });
    }
};