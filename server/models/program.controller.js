const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Program = mongoose.model('Program');

module.exports.newProgram = (req, res, next) => {
    console.log("program: ", req.body)
    var program = new Program();
    program.title = req.body.title;
    program.description = req.body.description;
    program.type = req.body.type;
    program.price = req.body.price;
    program.ownerId = req.body.ownerId;
    program.save((err, doc) => {
        if (!err) {
            console.log("Record inserted: ", doc)
            return res.status(200).json({ program: doc });

        } else {
            if (err.code == 11000)
                res.status(422).send(['ERROR.']);
            else
                return next(err);
        }
    });
}


module.exports.findProgram = (req, res, next) => {
    Program.find({}, 'title description type price ownerId').exec(function(err, program) {
        if (!program) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'program record not found.' });
        } else {
            console.log("Program found: ", program);
            return res.status(200).json({ programs: program });
        }
    });
}

module.exports.findProgramByOwnerId = (req, res, next) => {
    Program.find({ ownerId: req.get("ownerid") }, '_id title description type price ownerId').exec(function(err, program) {
        if (!program) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'program record not found.' });
        } else {
            console.log("Program found: ", program);
            return res.status(200).json({ programs: program });
        }
    });
}

module.exports.findProgramById = (req, res, next) => {
    Program.findOne({ _id: req.params['id'] }, '_id title description type price ownerId').exec(function(err, program) {
        if (!program) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'program record not found.' });
        } else {
            console.log("Program found: ", program);
            return res.status(200).json({ program: program });
        }
    });
}

module.exports.findProgramBySessionId = (req, res, next) => {
    Program.findOne({ _id: req.params['sessionid'] }, '_id title description type price ownerId').exec(function(err, program) {
        if (!program) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'program record not found.' });
        } else {
            console.log("Program found: ", program);
            return res.status(200).json({ program: program });
        }
    });
}


/*module.exports.editPostById = (req, res, next) => {
    console.log("yo");
    console.log(req.body);
    Program.findOneAndUpdate({ _id: req.params['id'] }, {title: req.body.title, description: req.body.description}).exec(function (err, program) {
        if (!program) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'program record not found.' });
        } else {
            console.log("Program Edited: ", program);
            return res.status(200).json({ posts: program });
        }
    });
}


module.exports.deletePostById = (req, res, next) => {
    Program.findOneAndDelete({ _id: req.params['id'] }).exec(function (err, program) {
        if (!program) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'program record not found.' });
        } else {
            console.log("Program deleted: ", program);
            return res.status(200).json({ posts: program });
        }
    }
    );
}*/