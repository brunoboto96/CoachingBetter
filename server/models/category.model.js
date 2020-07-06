const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

var categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'Category name can\'t be empty',
        unique: true
    }
});

mongoose.model('Category', categorySchema);