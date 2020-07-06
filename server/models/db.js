const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); } else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});



require('./program.model');
require('./user.model');
require('./session.model');
require('./module.model');
require('./activity.model');
require('./category.model');
require('./feedback.model');