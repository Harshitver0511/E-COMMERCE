const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        maxLenth: [30, 'Your name cannot exceed 30 characters'],
        minlength: [3, 'Your name must be at least 3 characters long'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});
// JWT TOKEN

userSchema.methods.getJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// Compare user password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.getResetPasswordToken = function() {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');
    // Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    // Set token expire time
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;
};


module.exports = mongoose.model('User', userSchema);