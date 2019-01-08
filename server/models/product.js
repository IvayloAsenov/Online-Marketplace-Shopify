var mongoose = require('mongoose');

var Product = mongoose.model('Product', {
    title: {
        type: String,
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
    }
});

module.exports = {Product};