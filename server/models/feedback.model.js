const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

var feedbackSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: 'name can\'t be empty'
    },
    userFk: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: false
    },
    programFk: {
        type: Schema.Types.ObjectId,
        ref: 'Program',
        require: true
    }
});

mongoose.model('Feedback', feedbackSchema);