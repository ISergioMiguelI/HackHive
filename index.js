require('dotenv').config(); // Load environment variables from .env file

const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing
const express = require('express'); // Import the express framework

// const routerLocal = require('./Routes/Local/Index'); // Import local routes (commented out)
const routerPgs = require('./routes/Pgs/index'); // Import Pgs routes
const publicRouter = require('./routes/Publico'); // Import public routes
const privateRouter = require('./routes/Privado'); // Import private routes

const app = express(); // Create an instance of express
app.use(bodyParser.json()); // Use body-parser middleware to parse JSON request bodies
app.use(cors()); // Use CORS middleware to enable Cross-Origin Resource Sharing

app.use(express.static('Pages')); // Serve static files from Pages directory

// Main routes
app.use('/', publicRouter); // Use publicRouter for the root path
app.use('/Private/', privateRouter); // Use privateRouter for /Private path
app.use('/Api/Pgs/', routerPgs); // Use routerPgs for /Api/Pgs path

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
