import { Platform } from 'react-native';
import url from './url';
import category from './category.service';

class PredictionsService {
    selectedPrediction = {
        probability: '',
        median: '',
        teachers: ''
    }

    selectedCategory = {
        _id: ''
    }

    selectedSessions = {
        session: [{
            _id: ''
        }]
    }

    selectedModules = {
        module: [{
            _id: ''
        }]
    }

    selectedActivities = {
        activity: [{
            name: ''
        }]
    }

    selectedPrograms = {
        program: [{
            name: ''
        }]
    }

    selectedFeedbacks = {
        feedback: [{
            name: ''
        }]
    }

    errors = {
        message: '',
        status: ''
    }
    errors2 = {
        message: ''
    }

    backendUrl = ''




    /*getPredictions = async(exercise, categoryName) => {
        if (Platform.OS == 'android') { this.backendUrl = url.getbackendURL_mobile() } else { this.backendUrl = url.getbackendURL() }
        await fetch(this.backendUrl + '/api/category/getname/' + categoryName, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((json) => {
                console.log("catid: ", json.category._id)
                    //this.selectedPrediction = json.category._id
                    //return json.category._id
                
                    this.getSessionByCategoryFk(json.category._id)

                console.log("222: ", this.activities.activityName)
                    /*
                        console.log(json.predictions)
                        this.predictions.data = json.predictions
                        console.log("this predictions: ", this.predictions.data)
                        this.selectedPrediction.probability = this.predictions.data.probability
                        this.selectedPrediction.median = this.predictions.data.median
                        this.selectedPrediction.teachers = this.predictions.data.teachers
                
                        return json.predictions
                        

            })
            .catch((error) => console.error(error))
    }
*/

    getCategoryId = async(categoryName) => {
        if (Platform.OS == 'android') { this.backendUrl = url.getbackendURL_mobile() } else { this.backendUrl = url.getbackendURL() }
        await fetch(this.backendUrl + '/api/category/getname/' + categoryName, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((json) => {
                this.selectedCategory._id = json.category._id
                console.log("cat: ", json.category._id)
                return json.category._id
            })
            .catch((error) => console.error(error))
    }

    getSessionByCategoryFk = async(categoryid) => {
        if (Platform.OS == 'android') { this.backendUrl = url.getbackendURL_mobile() } else { this.backendUrl = url.getbackendURL() }
        await fetch(this.backendUrl + '/api/session/getcategory/' + categoryid, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((json) => {
                this.selectedSessions.session = json.sessions
                console.log("sess: ", this.selectedSessions.session)
            })
            .catch((error) => console.error(error))
    }

    getModuleBySessionFk = async(sessionid) => {
        if (Platform.OS == 'android') { this.backendUrl = url.getbackendURL_mobile() } else { this.backendUrl = url.getbackendURL() }
        await fetch(this.backendUrl + '/api/module/getsession/' + sessionid, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((json) => {
                this.selectedModules.module = json.modules
                console.log("module: ", this.selectedModules.module)
            })
            .catch((error) => console.error(error))
    }

    getActivityByModuleFk = async(moduleid) => {
        if (Platform.OS == 'android') { this.backendUrl = url.getbackendURL_mobile() } else { this.backendUrl = url.getbackendURL() }
        await fetch(this.backendUrl + '/api/activity/getmodule/' + moduleid, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((json) => {
                console.log("exercise name: ", json.activity.name)
                this.selectedActivities.activity = json.activity
            })
            .catch((error) => console.error(error))
    }

    getProgramBySessionFk = async(sessionid) => {
        if (Platform.OS == 'android') { this.backendUrl = url.getbackendURL_mobile() } else { this.backendUrl = url.getbackendURL() }
        await fetch(this.backendUrl + '/api/program/getsession/' + sessionid, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((json) => {
                console.log("program: ", json.program)
                this.selectedPrograms.program = json.program
            })
            .catch((error) => console.error(error))
    }

    getFeedbackByProgramFk = async(programid) => {
        if (Platform.OS == 'android') { this.backendUrl = url.getbackendURL_mobile() } else { this.backendUrl = url.getbackendURL() }
        await fetch(this.backendUrl + '/api/feedback/getprogram/' + programid, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((json) => {
                console.log("feedback: ", json.feedback)
                this.selectedFeedbacks.feedback = json.feedback
            })
            .catch((error) => console.error(error))
    }
}

const predictions = new PredictionsService();
export default predictions;