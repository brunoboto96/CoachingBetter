const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Module = mongoose.model('Module');

module.exports.newModule = (req, res, next) => {
    console.log("module: ", req.body)
    var module = new Module();
    module.explanation = req.body.explanation;
    module.sessionFk = req.body.sessionfk;
    module.save((err, doc) => {
        if (!err) {
            console.log("Record inserted: ", doc)
            return res.status(200).json({ module: doc });

        } else {
            if (err.code == 11000)
                res.status(422).send(['ERROR.']);
            else
                return next(err);
        }
    });
}


module.exports.findModule = (req, res, next) => {
    Module.find({}, 'title description type price ownerId').exec(function(err, module) {
        if (!module) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'module record not found.' });
        } else {
            console.log("Module found: ", module);
            return res.status(200).json({ modules: module });
        }
    });
}

module.exports.findModuleBySessionId = (req, res, next) => {
    Module.find({ sessionFk: req.params["sessionid"] }, '_id title description type price ownerId').exec(function(err, module) {
        if (!module) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'module record not found.' });
        } else {
            console.log("Module found: ", module);
            return res.status(200).json({ modules: module });
        }
    });
}

module.exports.findModuleById = (req, res, next) => {
    Module.findOne({ _id: req.params['id'] }, '_id title description type price ownerId').exec(function(err, module) {
        if (!module) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'module record not found.' });
        } else {
            console.log("Module found: ", module);
            return res.status(200).json({ module: module });
        }
    });
}