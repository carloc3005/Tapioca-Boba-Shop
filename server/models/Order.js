const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the structure for items within an order
const orderItemSchema = new Schema({
  name: { type: String, required: true },
  sugar: { type: String, required: true },
  boba: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true } // Assuming you'll add price later
  // Add other item details if needed (e.g., size, ice level)
});

// Define the main order schema
const orderSchema = new Schema({
  items: [orderItemSchema], // An array of items based on the schema above
  totalAmount: { type: Number, required: true }, // Total cost of the order
  orderDate: { type: Date, default: Date.now } // Timestamp when the order was created
  // Add other order details if needed (e.g., customer name, status)
}, { timestamps: true }); // Adds createdAt and updatedAt timestamps automatically

// Create the model from the schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
