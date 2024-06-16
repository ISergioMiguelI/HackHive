require('dotenv').config(); // Load environment variables from .env file

const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing
const express = require('express'); // Import the express framework
const { PrismaClient } = require('@prisma/client'); // Import PrismaClient
const path = require('path'); // Importar módulo path para trabalhar com caminhos de arquivos

const prisma = new PrismaClient(); // Create an instance of PrismaClient

// const routerLocal = require('./Routes/Local/Index'); // Import local routes (commented out)
const routerPgs = require('./routes/Pgs/index'); // Import Pgs routes
const publicRouter = require('./routes/Publico'); // Import public routes
const privateRouter = require('./routes/Privado'); // Import private routes
const userRouter = require('./routes/Pgs/user'); // Import user routes


const app = express(); // Create an instance of express
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON request bodies
app.use(cors()); // Use CORS middleware to enable Cross-Origin Resource Sharing

app.use(express.static('Pages')); // Serve static files from Pages directory

// Main routes
app.use('/', publicRouter); // Use publicRouter for the root path
app.use('/Private/', privateRouter); // Use privateRouter for /Private path
app.use('/Api/Pgs/', routerPgs); // Use routerPgs for /Api/Pgs path
app.use('/Api/users', userRouter); // Use userRouter for /api/users path

const JWT_SECRET = process.env.JWT_SECRET || 'sdfksADDFGMLKCZdjfl34ksdfdb323';

const port = process.env.SERVER_PORT || 3000; // Definir a porta do servidor, padrão para 4242 se não especificado
app.listen(port, () => { // Iniciar o servidor express
    console.log('Express server listening on port', port); // Mensagem de log do servidor escutando
    console.log('Port open', port); // Mensagem de log de porta aberta
});
