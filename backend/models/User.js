import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please provide a valid email',
        ],
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 6,
        select: false,
    },
    phone: {
        type: String,
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
    },
    profileImage: {
        type: String,
        default: 'https://via.placeholder.com/150',
    },
    bio: String,
    booksListed: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
    }, ],
    booksBought: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
    }, ],
    booksSold: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
    }, ],
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    reviewCount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;