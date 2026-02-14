const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Models need to be loaded before routes
require('../server/models/AdminUser');
require('../server/models/TimelineEvent');
require('../server/models/LoveReason');
require('../server/models/LoveLetter');
require('../server/models/GalleryImage');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB (cached for serverless)
let isConnected = false;
const connectDB = async () => {
  if (isConnected) return;
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Error: ${error.message}`);
    throw error;
  }
};

// Middleware to ensure DB connection
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed' });
  }
});

// Routes
app.use('/api/timeline', require('../server/routes/timelineRoutes'));
app.use('/api/reasons', require('../server/routes/loveReasonRoutes'));
app.use('/api/letter', require('../server/routes/loveLetterRoutes'));
app.use('/api/gallery', require('../server/routes/galleryRoutes'));
app.use('/api/admin', require('../server/routes/authRoutes'));

// Error Handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

module.exports = app;
