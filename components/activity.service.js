import { Platform } from 'react-native';
import url from './url';

class ActivityService {
    selectedActivity = {
        _id: '',
        name: '',
        description: '',
        modulefk: ''
    }

    activities = {
        data: [{
            _id: '',
            name: '',
            description: '',
            modulefk: ''
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

    newActivity = async(name, description, modulefk) => {
        console.log("Create Activity")
        if (Platform.OS == 'android') {
            this.backendUrl = url.getbackendURL_mobile()
        } else {
            this.backendUrl = url.getbackendURL()
        }
        await fetch(this.backendUrl + '/api/activity/new', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    description: description,
                    modulefk: modulefk
                })
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                this.selectedActivity._id = json._id
                this.selectedActivity.name = json.name
                this.selectedActivity.description = json.description
                this.selectedActivity.modulefk = json.moduleFk

                return json
            })
    }


    getActivity = async() => {
        if (Platform.OS == 'android') {
            this.backendUrl = url.getbackendURL_mobile()
        } else {
            this.backendUrl = url.getbackendURL()
        }
        await fetch(this.backendUrl + '/api/activity/get', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json.activities)
                this.activities.data = json.activities
                console.log("this activities: ", this.activities.data)
                return json.activities
            })
            .catch((error) => console.error(error))
    }

    getActivityByModule = async(module) => {
        console.log("module: ", module)
        if (Platform.OS == 'android') {
            this.backendUrl = url.getbackendURL_mobile()
        } else {
            this.backendUrl = url.getbackendURL()
        }
        await fetch(this.backendUrl + '/api/session/getmodule/' + module, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json.activities)
                this.selectedActivity = json.activities
                console.log("this activities: ", this.selectedActivity)
                return json.activities
            })
            .catch((error) => console.error(error))
    }
}

const activity = new ActivityService();
export default activity;