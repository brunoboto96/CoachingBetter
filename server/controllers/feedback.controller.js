const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Feedback = mongoose.model('Feedback');


module.exports.findFeedbackByProgramId = (req, res, next) => {
    Feedback.find({ programFk: req.params['programid'] }, '_id rating programFk').exec(function(err, feedback) {
        if (!feedback) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'feedback record not found.' });
        } else {
            console.log("Feedback found: ", feedback);
            return res.status(200).json({ feedback: feedback });
        }
    });
}