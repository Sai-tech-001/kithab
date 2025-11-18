import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth.js';
import booksRoutes from './routes/books.js';
import usersRoutes from './routes/users.js';

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kithab')
    .then(() => console.log('MongoDB connected successfully'))
    .catch((error) => {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/users', usersRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    res.status(status).json({ success: false, message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});