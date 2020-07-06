const express = require('express');
const router = express.Router();


const ctrlUser = require('../controllers/user.controller');
const ctrlProgram = require('../controllers/program.controller');
const ctrlSession = require('../controllers/session.controller');
const ctrlCategory = require('../controllers/category.controller');
const ctrlModule = require('../controllers/module.controller');
const ctrlActivity = require('../controllers/activity.controller');
const ctrlFeedback = require('../controllers/feedback.controller');

/*

//require multer for the file uploads
var multer = require('multer');
// set the directory for the uploads to the uploaded to
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/admin/')
    },
    filename: function(req, file, cb) {
        var filename = Date.now();
        switch (file.mimetype) {
            case 'image/png':
                filename = filename + ".png";
                break;
            case 'image/jpeg':
                filename = filename + ".jpeg";
                break;
            case 'image/jpg':
                filename = filename + ".jpg";
                break;
            case 'video/mp4':
                filename = filename + ".mp4";
            case 'image/gif':
                filename = filename + ".gif";
                break;
            default:
                break;
        }
        cb(null, filename);
    }
});

var upload = multer({
    storage: storage
}).single('file');

*/






const jwtHelper = require('../config/jwtHelper');

router.post('/user/register', ctrlUser.register);
router.post('/user/authenticate', ctrlUser.authenticate);
router.get('/user/userProfile', jwtHelper.verifyJwtToken, ctrlUser.userProfile);

router.post('/program/new', ctrlProgram.newProgram);
router.get('/program/get/:id', ctrlProgram.findProgramById);
router.get('/program/getAll', ctrlProgram.findProgram);
router.get('/program/get', ctrlProgram.findProgramByOwnerId);
router.get('/program/getsession/:sessionid', ctrlProgram.findProgramBySessionId);

router.post('/category/new', ctrlCategory.newCategory);
router.get('/category/get/:id', ctrlCategory.findCategoryById);
router.get('/category/get', ctrlCategory.findCategory);
router.get('/category/getname/:name', ctrlCategory.findCategoryByName);

router.post('/session/new', ctrlSession.newSession);
router.get('/session/get/:id', ctrlSession.findSessionById);
router.get('/session/getcategory/:categoryid', ctrlSession.findSessionByCategoryFk);
router.get('/session/get', ctrlSession.findSession);
router.get('/session/getprogram/:program', ctrlSession.findSessionByProgramId);

router.post('/module/new', ctrlModule.newModule);
router.get('/module/get/:id', ctrlModule.findModuleById);
router.get('/module/get', ctrlModule.findModule);
router.get('/module/getsession/:sessionid', ctrlModule.findModuleBySessionId);

router.post('/activity/new', ctrlActivity.newActivity);
router.get('/activity/get/:id', ctrlActivity.findActivityById);
router.get('/activity/get', ctrlActivity.findActivity);
router.get('/activity/getmodule/:moduleid', ctrlActivity.findActivityByModuleId);

router.get('/feedback/getprogram/:programid', ctrlFeedback.findFeedbackByProgramId);

router.get('/prediction/get/:name', ctrlCategory.getPredictions);




module.exports = router;