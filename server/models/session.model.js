const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

var sessionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'title can\'t be empty'
    },
    description: {
        type: String,
        required: 'description can\'t be empty',
    },
    categoryFk: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },
    programFk: {
        type: Schema.Types.ObjectId,
        ref: 'Program',
        require: true
    }
});

mongoose.model('Session', sessionSchema);