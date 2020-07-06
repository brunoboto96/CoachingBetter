const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Category = mongoose.model('Category');
const Session = mongoose.model('Session');
const Module = mongoose.model('Module');
const Activity = mongoose.model('Activity');
const Program = mongoose.model('Program');
const Feedback = mongoose.model('Feedback');



module.exports.newCategory = (req, res, next) => {
    console.log("category: ", req.body)
    var category = new Category();
    category.name = req.body.name;
    category.save((err, doc) => {
        if (!err) {
            console.log("Record inserted: ", doc)
            return res.status(200).json({ category: doc });

        } else {
            if (err.code == 11000)
                res.status(422).send(['ERROR.']);
            else
                return next(err);
        }
    });
}


module.exports.findCategory = (req, res, next) => {
    Category.find({}, '_id name').exec(function(err, category) {
        if (!category) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'category record not found.' });
        } else {
            console.log("Category found: ", category);
            return res.status(200).json({ categories: category });
        }
    });
}

module.exports.findCategoryByName = (req, res, next) => {
    reqName = req.params["name"]
    console.log("reqName: ", reqName)
    Category.findOne({ name: reqName }, '_id name').exec(function(err, category) {
        if (!category) {
            var category = new Category();
            category.name = reqName;
            console.log("cat name2:", category.name)
            category.save((err, doc) => {
                if (!err) {
                    console.log("Record inserted: ", doc)
                    return res.status(200).json({ category: doc });

                } else {
                    if (err.code == 11000)
                        res.status(422).send(['ERROR.']);
                    else
                        return next(err);
                }
            });
        } else {
            console.log("Category found: ", category);
            return res.status(200).json({ category: category });
        }
    });
}

module.exports.findCategoryById = (req, res, next) => {
    Category.findOne({ _id: req.params['id'] }, '_id title description type price ownerId').exec(function(err, category) {
        if (!category) {
            console.log(err);
            return res.status(404).json({ status: false, message: 'category record not found.' });
        } else {
            console.log("Category found: ", category);
            return res.status(200).json({ category: category });
        }
    });
}

module.exports.getPredictions = (req, res, next) => {
    reqName = req.params["name"]
    console.log("reqName: ", reqName)

    Category.findOne({ name: reqName }, '_id name').exec(function(err, category) {
        if (!category) {
            console.log('Category not found.')
            return res.status(422).send(['Category not found.']);
        } else {
            console.log("Category found: ", category);
            console.log("catid: ", category._id)
            Session.find({ categoryFk: category._id }, '_id title programFk').exec(function(err, session) {
                if (!session) {
                    console.log('Session not found.')
                    return res.status(422).send(['Session not found.']);
                } else {
                    console.log("Session found: ", session);
                    predictions = []

                    predictions_checked = []

                    for (let s = 0; s < session.length; s++) {
                        console.log("sessionid: ", session[s]._id)
                            //cat -> id -> session -> module -> activity -> name
                        Module.find({ sessionFk: session[s]._id }, '_id').exec(function(err, module) {
                            if (!module) {
                                console.log('Module not found.')
                                return res.status(422).send(['Module not found.']);
                            } else {
                                console.log("Module found: ", module);
                                for (let m = 0; m < module.length; m++) {
                                    console.log("moduleid: ", module[m]._id)
                                    Activity.findOne({ moduleFk: module[m]._id }, '_id name').exec(function(err, activity) {
                                        if (!activity) {
                                            console.log('Activity not found.')
                                            return res.status(422).send(['Activity not found.']);
                                        } else {
                                            console.log("Activity found: ", activity);
                                            console.log("activityid: ", activity._id)
                                            console.log("exercise: ", activity.name)
                                                //build array
                                            Program.findOne({ _id: session[s].programFk }, '_id title').exec(function(err, program) {
                                                if (!program) {
                                                    console.log('Program not found.')
                                                    return res.status(422).send(['Activity not found.']);
                                                } else {
                                                    console.log("Program: ", program.title)
                                                    console.log("Programid: ", program._id)

                                                    Feedback.find({ programFk: program._id }, '_id rating').exec(function(err, feedback) {
                                                        if (!feedback) {
                                                            console.log('Feedback not found.')
                                                            return res.status(422).send(['Feedback not found.']);
                                                        } else {
                                                            for (let f = 0; f < feedback.length; f++) {
                                                                console.log("feedback: ", feedback[f].rating * 10)

                                                                predictions.push({ name: activity.name, rating: feedback[f].rating * 10, count: f + 1 })

                                                                //predictions.rating.push(feedback[f].rating * 10)
                                                                //build array
                                                                if (f == feedback.length - 1) {
                                                                    console.log("predfinale: ", predictions)
                                                                    return res.status(200).json(predictions)
                                                                    var checked = async function(a, b) {
                                                                        return await check(predictions, predictions_checked)


                                                                        /*console.log("resuLATDO: ", result)
                                                                        try {
                                                                            return res.status(200).json(result);

                                                                        } catch (error) {
                                                                            console.log(error)
                                                                        }*/
                                                                    }


                                                                }
                                                            }
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            }
                        })

                        //cat -> id -> session -> program -> id -> feedback

                    }

                }
            })
        }
    })

}

async function check(predictions, predictions_checked) {
    console.log("last pred: ", predictions)
    last = ""
    ratings = 0
    counts = 0

    for (let p = 0; p < predictions.length; p++) {

        if (predictions.length > 1) {
            console.log("***")
            console.log(p)

            console.log("name: ", predictions[p].name)
            console.log("last: ", last)

            if (predictions[p].name != last) {
                if (last != "") {
                    console.log("last2: ", last)
                    predictions_checked.push({ name: last, rating: ratings, count: counts })
                    if (p == predictions.length - 1) {
                        predictions_checked.push({ name: predictions[p].name, rating: predictions[p].rating, count: predictions[p].count })
                    }
                    ratings = 0
                } else {
                    predictions_checked = []
                }
            }

            if (p == predictions.length - 1 && predictions[p].name == last) {
                predictions_checked.push({ name: predictions[p].name, rating: ratings + predictions[p].rating, count: predictions[p].count })
            }

            if (p == predictions.length - 1) {

                try {

                    console.log("final: ", predictions_checked)
                    return predictions_checked



                } catch (error) {
                    console.log(error)
                }
                //return predictions_checked
            }

        } else {
            console.log("Not enough data.")
        }
        ratings = ratings + predictions[p].rating
        last = predictions[p].name
        counts = predictions[p].count
        if (p == predictions.length - 1) {
            console.log("last")
        }
        //console.log("p." + p + ": ", predictions[p])
        //console.log(predictions[p].rating)
        console.log(p)
        console.log(predictions_checked)

        console.log("***")



    }
}