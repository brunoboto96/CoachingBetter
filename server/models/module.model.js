const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

var moduleSchema = new mongoose.Schema({
    explanation: {
        type: String,
        required: 'explanation can\'t be empty'
    },
    sessionFk: {
        type: Schema.Types.ObjectId,
        ref: 'Session',
        require: true
    }
});

mongoose.model('Module', moduleSchema);