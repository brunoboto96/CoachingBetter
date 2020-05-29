import { Platform } from 'react-native';
import url from './url';

class ModulesService {
    selectedModule = {
        _id: '',
        name: '',
        sessionfk: ''
    }

    modules = {
        data: [{
            _id: '',
            name: '',
            sessionfk: ''
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

    newModules = async(explanation, sessionfk) => {
        console.log("Create Modules")
        if (Platform.OS == 'android') {
            this.backendUrl = url.getbackendURL_mobile()
        } else {
            this.backendUrl = url.getbackendURL()
        }
        await fetch(this.backendUrl + '/api/module/new', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    explanation: explanation,
                    sessionfk: sessionfk
                })
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                this.selectedModule._id = json._id
                this.selectedModule.explanation = json.name
                this.selectedModule.sessionfk = json.sessionfk

                return json
            })
    }


    getModules = async() => {
        if (Platform.OS == 'android') {
            this.backendUrl = url.getbackendURL_mobile()
        } else {
            this.backendUrl = url.getbackendURL()
        }
        await fetch(this.backendUrl + '/api/module/get', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json.modules)
                this.modules.data = json.modules
                console.log("this modules: ", this.modules.data)
                return json.modules
            })
            .catch((error) => console.error(error))
    }

    getModulesByName = async(name) => {
        console.log("name: ", name)
        if (Platform.OS == 'android') {
            this.backendUrl = url.getbackendURL_mobile()
        } else {
            this.backendUrl = url.getbackendURL()
        }
        await fetch(this.backendUrl + '/api/session/get/' + name, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json.modules)
                this.selectedModules = json.modules
                console.log("this modules: ", this.selectedModules)
                return json.modules
            })
            .catch((error) => console.error(error))
    }
}

const modules = new ModulesService();
export default modules;