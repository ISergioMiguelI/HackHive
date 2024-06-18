    const { PrismaClient } = require('@prisma/client');
    const { validationResult } = require('express-validator');
    const bcrypt = require('bcryptjs');
    const prisma = new PrismaClient();
    const { generateToken } = require('../../utils/authenticate');

 
    exports.getById = async (req, res) => {
    
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
            return res.status(400).json({ error: 'E-mail already registred' });
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
        res.status(500).json({ error: 'Error getting User', details: error.message });
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

    exports.forgotPassword = async (req, res) => {
        const { email } = req.body;
        try {
            const user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                return res.status(404).json({ message: 'Email not found' });
            }
    
            const token = crypto.randomBytes(32).toString('hex');
            const tokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now
    
            await prisma.user.update({
                where: { email },
                data: { resetPasswordToken: token, resetPasswordExpires: tokenExpiry }
            });
    
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'your-email@gmail.com',
                    pass: 'your-email-password'
                }
            });
    
            const mailOptions = {
                to: user.email,
                from: 'passwordreset@hackhive.com',
                subject: 'HackHive Password Reset',
                text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                       Please click on the following link, or paste this into your browser to complete the process:\n\n
                       http://${req.headers.host}/recover-password?token=${token}\n\n
                       If you did not request this, please ignore this email and your password will remain unchanged.\n`
            };
    
            await transporter.sendMail(mailOptions);
    
            res.status(200).json({ message: 'Email sent' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
    
    exports.resetPassword = async (req, res) => {
        const { token, password } = req.body;
        try {
            const user = await prisma.user.findFirst({
                where: {
                    resetPasswordToken: token,
                    resetPasswordExpires: { gt: new Date() }
                }
            });
    
            if (!user) {
                return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
            }
    
            const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
            await prisma.user.update({
                where: { id: user.id },
                data: { password: hashedPassword, resetPasswordToken: null, resetPasswordExpires: null }
            });
    
            res.status(200).json({ message: 'Password has been updated' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
