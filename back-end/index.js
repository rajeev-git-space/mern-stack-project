const express = require('express');
require('dotenv').config();;
const cors = require('cors');

const PORT = process.env.PORT || 8000;

const {connectDB} = require('./config/db');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Import Routes
// const userRoutes = require('./routes/userRoutes'); // Example of user-related routes
// const projectRoutes = require('./routes/projectRoutes'); // Example of project-related routes

// Use Routes
// app.use('/api/users', userRoutes);
// app.use('/api/projects', projectRoutes);

connectDB();


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
