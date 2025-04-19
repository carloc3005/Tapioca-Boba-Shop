// require('dotenv').config(); // No longer needed for DB connection string
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const orderRoutes = require('./routes/orders'); // Import order routes

const app = express();
const PORT = process.env.PORT || 5001; // Use port 5001 or environment variable

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use('/api/orders', orderRoutes); // Use the order routes for paths starting with /api/orders

// Basic route for testing server
app.get('/', (req, res) => {
  res.send('Tapioca Boba Shop Server is running!');
});

// Connect to MongoDB

mongoose.connect("mongodb://localhost:27017")
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit if DB connection fails
  });

// Basic error handling (optional, can be expanded)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
