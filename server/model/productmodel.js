const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        unique: true,
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price']
    },
    description: {
        type: String,
        required: [true, 'Please provide a description']
    },
    ratings: {
        type: Number,
        default: 0
    },
    images:[{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        
        }
    }
    ],
    category: {
        type: String,
        required: [true, 'Please provide a category']
    },
    stock: {
        type: Number,
        required: [true, 'Please provide a stock']
    },
    numReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: [true, 'Please provide a name']
            },
            rating: {
                type: Number,
                required: [true, 'Please provide a rating']
            },
            comment: {
                type: String,
                required: [true, 'Please provide a comment']
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });
const Product = mongoose.model('Product', productSchema);
module.exports = Product;