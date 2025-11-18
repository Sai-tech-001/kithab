import express from 'express';
import Book from '../models/Book.js';
import User from '../models/User.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// Get all books with filters
router.get('/', async(req, res) => {
    try {
        const { category, minPrice, maxPrice, condition, search, sort, page = 1, limit = 10 } = req.query;

        let query = {};

        if (search) {
            query.$text = { $search: search };
        }

        if (category) {
            query.category = category;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        if (condition) {
            query.condition = condition;
        }

        query.isSold = false;

        let sortOption = {};
        if (sort) {
            if (sort === 'newest') sortOption = { createdAt: -1 };
            if (sort === 'oldest') sortOption = { createdAt: 1 };
            if (sort === 'price-low') sortOption = { price: 1 };
            if (sort === 'price-high') sortOption = { price: -1 };
            if (sort === 'rating') sortOption = { rating: -1 };
            if (sort === 'views') sortOption = { views: -1 };
        } else {
            sortOption = { createdAt: -1 };
        }

        const skip = (page - 1) * limit;

        const books = await Book.find(query)
            .populate('seller', 'name email phone rating')
            .sort(sortOption)
            .skip(skip)
            .limit(Number(limit));

        const total = await Book.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            page: Number(page),
            limit: Number(limit),
            books,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get single book
router.get('/:id', async(req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
                req.params.id, { $inc: { views: 1 } }, { new: true }
            )
            .populate('seller', 'name email phone rating address bio profileImage')
            .populate('reviews');

        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        res.status(200).json({
            success: true,
            book,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Create book
router.post('/', protect, async(req, res) => {
    try {
        const { title, author, description, category, price, condition, images, location, deliveryOptions } = req.body;

        const book = await Book.create({
            title,
            author,
            description,
            category,
            price,
            condition,
            images,
            location,
            deliveryOptions,
            seller: req.userId,
        });

        // Add book to user's booksListed
        await User.findByIdAndUpdate(req.userId, {
            $push: { booksListed: book._id },
        });

        res.status(201).json({
            success: true,
            book,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update book
router.put('/:id', protect, async(req, res) => {
    try {
        let book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        // Check if user is seller
        if (book.seller.toString() !== req.userId) {
            return res.status(403).json({ success: false, message: 'Not authorized to update this book' });
        }

        book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).json({
            success: true,
            book,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete book
router.delete('/:id', protect, async(req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        if (book.seller.toString() !== req.userId) {
            return res.status(403).json({ success: false, message: 'Not authorized to delete this book' });
        }

        // Remove book from user's booksListed
        await User.findByIdAndUpdate(req.userId, {
            $pull: { booksListed: req.params.id },
        });

        await Book.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Mark book as sold
router.patch('/:id/sold', protect, async(req, res) => {
    try {
        const { buyerId } = req.body;

        let book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        if (book.seller.toString() !== req.userId) {
            return res.status(403).json({ success: false, message: 'Not authorized to update this book' });
        }

        book.isSold = true;
        book.buyer = buyerId;
        await book.save();

        // Update seller's booksSold
        await User.findByIdAndUpdate(req.userId, {
            $push: { booksSold: req.params.id },
        });

        // Update buyer's booksBought
        if (buyerId) {
            await User.findByIdAndUpdate(buyerId, {
                $push: { booksBought: req.params.id },
            });
        }

        res.status(200).json({
            success: true,
            book,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Add review
router.post('/:id/review', async(req, res) => {
    try {
        const { name, email, rating, comment } = req.body;

        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        // Add review
        book.reviews.push({
            name,
            email,
            rating,
            comment,
        });

        // Update average rating
        const avgRating = book.reviews.reduce((acc, review) => acc + review.rating, 0) / book.reviews.length;
        book.rating = avgRating;

        await book.save();

        res.status(201).json({
            success: true,
            book,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get books by category
router.get('/category/:category', async(req, res) => {
    try {
        const books = await Book.find({ category: req.params.category, isSold: false })
            .populate('seller', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            books,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get trending books
router.get('/trending/all', async(req, res) => {
    try {
        const books = await Book.find({ isSold: false })
            .populate('seller', 'name email')
            .sort({ views: -1, rating: -1 })
            .limit(8);

        res.status(200).json({
            success: true,
            books,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;