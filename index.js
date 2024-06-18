require('dotenv').config(); // Load environment variables from .env file

const express = require('express'); // Import the express framework
const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing
const path = require('path'); // Import path module to work with file paths
const { PrismaClient } = require('@prisma/client'); // Import PrismaClient

const prisma = new PrismaClient(); // Create an instance of PrismaClient

// Import routes
const routerPgs = require('./routes/Pgs/index');
const publicRouter = require('./routes/Publico');
const privateRouter = require('./routes/Privado');
const userRouter = require('./routes/Pgs/user');
const toolRouter = require('./routes/Pgs/tool');

const app = express(); // Create an instance of express

// Middleware
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON request bodies
app.use(cors()); // Use CORS middleware to enable Cross-Origin Resource Sharing

// Serve static files
app.use(express.static(path.join(__dirname, 'Pages')));

// Routes
app.get('/undermaint', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'undermaint.html'));
});

app.get('/attack', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'attack.html'));
});

// Main routes
app.use('/', publicRouter); // Use publicRouter for the root path
app.use('/Private', privateRouter); // Use privateRouter for /Private path
app.use('/Api/Pgs', routerPgs); // Use routerPgs for /Api/Pgs path
app.use('/Api/users', userRouter); // Use userRouter for /Api/users path
app.use('/Api/tools', toolRouter); // Use toolRouter for /Api/tools path

// JWT Secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'sdfksADDFGMLKCZdjfl34ksdfdb323';

// Server setup
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
    console.log('Express server listening on port', port);
    console.log('Port open', port);
});
