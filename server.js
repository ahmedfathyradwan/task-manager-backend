const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Load environment variables
dotenv.config({ path: './config.env' });

// Export the app for Vercel
module.exports = app;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// Connect to Database
connectDB();

// Routes
app.use('/api/tasks', taskRoutes);

if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`App running on port ${port}...`);
  });
}
