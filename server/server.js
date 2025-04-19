const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors'); // Import cors
const app = express();

app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json());

// Connect to MongoDB
// Make sure MongoDB server is running
mongoose.connect('mongodb://localhost:27017/bobaOrders', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Define a schema for orders
const orderSchema = new mongoose.Schema({
    orderNumber: Number,
    items: Array,
    total: Number,
    userName: String, // Include userName
    userPhone: String // Include userPhone
});

const Order = mongoose.model('Order', orderSchema);

// Serve static files from the React app's build directory
app.use(express.static(path.join(__dirname, '../client/dist'))); // Adjusted path

// Endpoint to handle order submission
app.post('/api/submit-order', async (req, res) => { // Added /api prefix
    try {
        console.log('Order received:', req.body); // Log the entire request body to debug

        // Basic validation
        if (!req.body.items || req.body.items.length === 0 || !req.body.total || !req.body.userName || !req.body.userPhone) {
            return res.status(400).json({ success: false, message: 'Missing required order information.' });
        }

        // Generate a simple order number (you might want a more robust method)
        const orderCount = await Order.countDocuments();
        const newOrderData = {
            ...req.body,
            orderNumber: orderCount + 1 // Simple sequential number
        };

        const newOrder = new Order(newOrderData);
        await newOrder.save();
        // Send back the saved order, including the generated order number
        res.json({ success: true, order: newOrder });
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ success: false, message: 'Failed to save order.' });
    }
});

// Endpoint to get all orders (consider adding authentication/authorization later)
app.get('/api/orders', async (req, res) => { // Added /api prefix
    try {
        const orders = await Order.find().sort({ orderNumber: -1 }); // Sort by newest first
        res.json(orders);
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Serve the React app for any other requests (handles client-side routing)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html')); // Serve React's index.html
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

