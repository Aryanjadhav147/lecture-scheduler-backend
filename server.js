require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const instructorRoutes = require('./routes/instructor');

const app = express();

// 1. DEFINE ALLOWED ORIGINS (Your Frontend URL)
const allowedOrigins = [
  'http://localhost:3000',                       // For local development
  'https://lecture-scheduler.netlify.app'       // *** YOUR DEPLOYED FRONTEND URL ***
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allows requests with no origin (like mobile apps) and explicitly allowed origins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  // IMPORTANT: This explicitly allows the 'Authorization' header, which is sent with your token.
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Middleware
// 2. APPLY CONFIGURED CORS MIDDLEWARE
app.use(cors(corsOptions));
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/instructor', instructorRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));