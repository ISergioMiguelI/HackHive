require('dotenv').config(); // Load environment variables from .env file

const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing
const express = require('express'); // Import the express framework
const { PrismaClient } = require('@prisma/client'); // Import PrismaClient

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


// Example route to demonstrate Prisma Client usage
app.get('/api/users/login', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    
    const passwordMatch = user.password === password;

    if (passwordMatch) {
      res.json({ message: 'Login successful', token: 'jwt-token' });
    } else {
      res.status(401).json({ message: 'Incorrect email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


app.post('/api/users/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const newUser = await prisma.user.create({
      data: {
        email,
        password, 
      },
    });

    res.json({ message: 'Registration successful', token: 'jwt-token' });
  } catch (error) {
    console.error('Error in registration:', error);
    res.status(500).json({ message: 'Registration failed: ' + error.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
