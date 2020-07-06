const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Activity = mongoose.model('Activity');

module.exports.newActivity = (req, res, next) => {
    console.log("activity: ", req.body)
    var activity = new Activity();
    activity.name = req.body.name;
    activity.description = req.body.description;
    activity.moduleFk = req.body.modulefk;
    activity.save((err, doc) => {
        if (!err) {
            console.log("Record inserted: ", doc)
            return res.status(200).json({ activity: doc });

        } else {
            if (err.code == 11000)
                res.status(422).send(['ERROR.']);
            else
                return next(err);
        }
    });
}


module.exports.findActivity = (req, res, next) => {
    Activity.find({}, '_id name description moduleFk').exec(function(err, activity) {
        if (!activity) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'activity record not found.' });
        } else {
            console.log("Activity found: ", activity);
            return res.status(200).json({ activitys: activity });
        }
    });
}

module.exports.findActivityByModuleId = (req, res, next) => {
    reqParams = req.params["moduleid"]
    Activity.findOne({ moduleFk: reqParams }, '_id name description moduleFk').exec(function(err, activity) {
        if (!activity) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'activity record not found.' });
        } else {
            console.log("Activity found: ", activity);
            return res.status(200).json({ activity: activity });
        }
    });
}

module.exports.findActivityById = (req, res, next) => {
    Activity.findOne({ _id: req.params['id'] }, '_id name description moduleFk').exec(function(err, activity) {
        if (!activity) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'activity record not found.' });
        } else {
            console.log("Activity found: ", activity);
            return res.status(200).json({ activity: activity });
        }
    });
}