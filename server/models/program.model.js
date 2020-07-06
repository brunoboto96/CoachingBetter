const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

var programSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'title can\'t be empty'
    },
    description: {
        type: String,
        required: 'description can\'t be empty',
    },
    type: {
        type: String,
        required: 'type can\'t be empty',
    },
    price: {
        type: Number,
        required: 'price can\'t be empty',
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    }
});

mongoose.model('Program', programSchema);