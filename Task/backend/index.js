const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Connect to MongoDB
connectDB();

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/checkout', require('./routes/checkout'));
app.use('/api/webhook', require('./routes/webhook')); 


// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server UP http://localhost:${PORT}`));

