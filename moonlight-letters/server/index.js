const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config({ path: path.join(__dirname, '.env') });

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Moonlight Letters API is running...');
});

// Routes
app.use('/api/timeline', require('./routes/timelineRoutes'));
app.use('/api/reasons', require('./routes/loveReasonRoutes'));
app.use('/api/letter', require('./routes/loveLetterRoutes'));
app.use('/api/gallery', require('./routes/galleryRoutes'));
app.use('/api/admin', require('./routes/authRoutes'));

// Error Handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
