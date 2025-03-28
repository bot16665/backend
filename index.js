const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Import routes
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const discountRoutes = require('./routes/discountRoutes');
const userRoutes = require('./routes/userRoutes');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Enable CORS for your frontend domains
app.use(cors({
  origin: 'https://solemotive.netlify.app', // Replace with your frontend URL
  credentials: true, // Allow credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: true
}));

// Suppress deprecation warnings
mongoose.set('strictQuery', true);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // Exit if MongoDB connection fails
  });

// Use routes
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/discounts', discountRoutes);
app.use('/api/users', userRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'API is running' });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error('⚠️ Server Error:', err.message);
  res.status(500).json({
    success: false,
    error: 'Something went wrong! Please try again later.'
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
