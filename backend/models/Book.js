import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a title'],
    },
    author: {
        type: String,
        required: [true, 'Please provide an author'],
    },
    description: String,
    category: {
        type: String,
        enum: [
            'Fiction',
            'Non-Fiction',
            'Science',
            'History',
            'Biography',
            'Self-Help',
            'Technology',
            'Education',
            'Other',
        ],
        default: 'Other',
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price'],
    },
    condition: {
        type: String,
        enum: ['Like New', 'Good', 'Fair', 'Poor'],
        default: 'Good',
    },
    yearPublished: Number,
    yearPurchased: Number,
    images: [String],
    seller: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    isSold: {
        type: Boolean,
        default: false,
    },
    buyer: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
    },
    views: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviews: [{
        name: String,
        email: String,
        rating: Number,
        comment: String,
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }, ],
    location: {
        city: String,
        state: String,
        zipCode: String,
    },
    deliveryOptions: {
        pickup: Boolean,
        shipping: Boolean,
    },
    tags: [String],
}, { timestamps: true });

// Create text index for search
bookSchema.index({ title: 'text', author: 'text', description: 'text' });

const Book = mongoose.model('Book', bookSchema);
export default Book;