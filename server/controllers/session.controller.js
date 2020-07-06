const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Session = mongoose.model('Session');

module.exports.newSession = (req, res, next) => {
    console.log("session: ", req.body)
    var session = new Session();
    session.title = req.body.title;
    session.description = req.body.description;
    session.categoryFk = req.body.categoryfk;
    session.programFk = req.body.programfk;
    session.save((err, doc) => {
        if (!err) {
            console.log("Record inserted: ", doc)
            return res.status(200).json({ session: doc });

        } else {
            if (err.code == 11000)
                res.status(422).send(['ERROR.']);
            else
                return next(err);
        }
    });
}


module.exports.findSession = (req, res, next) => {
    Session.find({}, 'title description type price ownerId').exec(function(err, session) {
        if (!session) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'session record not found.' });
        } else {
            console.log("Session found: ", session);
            return res.status(200).json({ sessions: session });
        }
    });
}

module.exports.findSessionByProgramId = (req, res, next) => {
    Session.find({ programid: req.params["program"] }, '_id title description categoryFk programFk').exec(function(err, session) {
        if (!session) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'session record not found.' });
        } else {
            console.log("Session found: ", session);
            return res.status(200).json({ sessions: session });
        }
    });
}

module.exports.findSessionById = (req, res, next) => {
    Session.findOne({ _id: req.params["id"] }, '_id title description categoryFk programFk').exec(function(err, session) {
        if (!session) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'session record not found.' });
        } else {
            console.log("Session found: ", session);
            return res.status(200).json({ session: session });
        }
    });
}

module.exports.findSessionByCategoryFk = (req, res, next) => {
    Session.find({ categoryFk: req.params["categoryid"] }, '_id title description categoryFk programFk').exec(function(err, session) {
        console.log("reqparams: ", req.params["categoryid"])
        if (!session) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'session record not found.' });
        } else {
            console.log("Session found: ", session);
            return res.status(200).json({ sessions: session });
        }
    });
}