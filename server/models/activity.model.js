const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

var activitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'name can\'t be empty',
    },
    description: {
        type: String,
        required: 'description can\'t be empty',
    },
    moduleFk: {
        type: Schema.Types.ObjectId,
        ref: 'Module',
        require: true
    }
});

mongoose.model('Activity', activitySchema);