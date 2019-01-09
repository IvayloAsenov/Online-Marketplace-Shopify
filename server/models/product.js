/*
    Product model
*/

var mongoose = require('mongoose');

var Product = mongoose.model('Product', {
    title: {
        type: String,
        unique: true,
        required: true,
        minlength: 1,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    inventory_count: {
        type: Number,
        required: true,
        min: 0
    }
});

module.exports = {Product};