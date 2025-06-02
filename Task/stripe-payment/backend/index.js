const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());

connectDB();


app.use('/api/products', require('./routes/products'));
app.use('/api/checkout', require('./routes/checkout'));
app.use('/api/webhook', require('./routes/webhook')); 



const PORT = 8000;
app.listen(PORT, () => console.log(`Server UP http://localhost:${PORT}`));

