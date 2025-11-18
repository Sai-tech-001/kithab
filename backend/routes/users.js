import express from 'express';
import User from '../models/User.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// Get user profile
router.get('/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .populate('booksListed')
            .populate('booksBought')
            .populate('booksSold');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update user profile
router.put('/:id', protect, async(req, res) => {
    try {
        if (req.params.id !== req.userId) {
            return res.status(403).json({ success: false, message: 'Not authorized to update this profile' });
        }

        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get user's listed books
router.get('/:id/books-listed', async(req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('booksListed');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            books: user.booksListed,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get user's bought books
router.get('/:id/books-bought', async(req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('booksBought');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            books: user.booksBought,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get user's sold books
router.get('/:id/books-sold', async(req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('booksSold');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            books: user.booksSold,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get all sellers
router.get('/', async(req, res) => {
    try {
        const users = await User.find().select('name email phone rating profileImage');

        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;