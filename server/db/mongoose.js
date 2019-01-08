var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://local');

module.exports = {mongoose};