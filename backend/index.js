const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const carRoutes = require('./routes/cars');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/cars', carRoutes);

// Error Handler Middleware
app.use(errorHandler);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
