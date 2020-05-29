import { Platform } from 'react-native';
import url from './url';

class SessionService {
    selectedSession = {
        _id: '',
        title: '',
        description: '',
        categoryfk: '',
        programfk: ''
    }

    sessions = {
        data: [{
            _id: '',
            title: '',
            description: '',
            categoryfk: '',
            programfk: ''
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

    newSession = async(title, description, categoryfk, programfk) => {
        console.log("Create Session")
        if (Platform.OS == 'android') {
            this.backendUrl = url.getbackendURL_mobile()
        } else {
            this.backendUrl = url.getbackendURL()
        }
        await fetch(this.backendUrl + '/api/session/new', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    categoryfk: categoryfk,
                    programfk: programfk
                })
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                this.selectedSession._id = json._id
                this.selectedSession.title = json.title
                this.selectedSession.description = json.description
                this.selectedSession.categoryfk = json.categoryFk
                this.selectedSession.programfk = json.programFk
            })
    }


    getSessions = async(programid) => {
        console.log("programid: ", programid)
        if (Platform.OS == 'android') {
            this.backendUrl = url.getbackendURL_mobile()
        } else {
            this.backendUrl = url.getbackendURL()
        }
        await fetch(this.backendUrl + '/api/session/get', {
                method: 'GET',
                headers: {
                    'programid': programid,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json.sessions)
                this.sessions.data = json.sessions
                console.log("this sessions: ", this.sessions.data)
                return json.sessions
            })
            .catch((error) => console.error(error))
    }

    getSessionById = async(sessionId) => {
        console.log("sessionId: ", sessionId)
        if (Platform.OS == 'android') {
            this.backendUrl = url.getbackendURL_mobile()
        } else {
            this.backendUrl = url.getbackendURL()
        }
        await fetch(this.backendUrl + '/api/session/get/' + sessionId, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json.program)
                this.selectedSession = json.session
                console.log("this session: ", this.selectedSession)
                return json.session
            })
            .catch((error) => console.error(error))
    }
}

const session = new SessionService();
export default session;