import { Platform } from 'react-native';
import url from '../components/url';

class ProgramService {
    selectedProgram = {
        _id: '',
        title: '',
        description: '',
        type: '',
        price: ''
    }

    programs = {
        data: [{
            _id: '',
            title: '',
            description: '',
            type: '',
            price: ''
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

    /*  login(username, password) {
          if (Platform.OS == 'android') {
              this.backendUrl = url.getbackendURL_mobile()
          } else {
              this.backendUrl = url.getbackendURL()
          }
          fetch(this.backendUrl + '/api/user/authenticate', {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  username: username,
                  password: password
              })
          })
              .then((response) => response.json())
              .then((json) => {
                  this.storeToken(json['token'])
                  this.selectedUser.name = name;
                  this.selectedUser.account_type = '';
                  this.selectedUser.username = username;
                  this.selectedUser.email = '';
                  this.selectedUser.token = json['token'];
  
                  console.log("selecteduser ", username)
  
                  this.getToken();
              })
      }
  */
    newProgram = async(title, description, type, price, owner_fk) => {
        console.log("Create Program")
        if (Platform.OS == 'android') {
            this.backendUrl = url.getbackendURL_mobile()
        } else {
            this.backendUrl = url.getbackendURL()
        }
        await fetch(this.backendUrl + '/api/program/new', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    type: type,
                    price: price,
                    ownerId: owner_fk
                })
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                this.selectedProgram._id = json._id
                this.selectedProgram.title = json.title
                this.selectedProgram.description = json.description
                this.selectedProgram.type = json.type
                this.selectedProgram.price = json.price
            })
    }


    getPrograms = async(userid) => {
        console.log("ownerId: ", userid)
        if (Platform.OS == 'android') {
            this.backendUrl = url.getbackendURL_mobile()
        } else {
            this.backendUrl = url.getbackendURL()
        }
        await fetch(this.backendUrl + '/api/program/get', {
                method: 'GET',
                headers: {
                    'ownerid': userid,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json.programs)
                this.programs.data = json.programs
                console.log("this programs: ", this.programs.data)
                return json.programs
            })
            .catch((error) => console.error(error))
    }

    getProgramsById = async(programId) => {
        console.log("programId: ", programId)
        if (Platform.OS == 'android') {
            this.backendUrl = url.getbackendURL_mobile()
        } else {
            this.backendUrl = url.getbackendURL()
        }
        await fetch(this.backendUrl + '/api/program/get/' + programId, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json.program)
                this.programs.data = json.program
                console.log("this programs: ", this.programs.data)
                return json.programs
            })
            .catch((error) => console.error(error))
    }
}
/*    logout() {
        try {
            AsyncStorage.removeItem('@storage_Key')
            console.log("storage_key removed")
        } catch (e) {
            console.log(e)
        }
    }

    storeToken = async (value) => {
        try {
            await AsyncStorage.setItem('@storage_Key', value)
        } catch (e) {
            console.log(e)
        }
    }

    getToken = async () => {
        try {
            const value = await AsyncStorage.getItem('@storage_Key')
            if (value !== null) {
                console.log("Token in storage: ", value);
                this.selectedUser.token = value;
                var userPayload = atob(value.split('.')[1]);
                console.log("https://jwt.io/ : ", JSON.parse(userPayload))
                console.log("payload ", userPayload)
                console.log(Date.now() / 1000)
                if (userPayload.exp < Date.now() / 1000) {
                    console.log("Token expired")
                    //navigate authScreen
                    return false
                } else {
                    console.log("Token Valid")
                    const userData = await this.getUser(this.selectedUser.token)
                    return true
                }
            } else {
                console.log("No Token stored")
                return false
            }
        } catch (error) {
            console.log(error);
        }
    }

    
}

*/
/*
postUser(user) {
return this.http.post(environment.apiBaseUrl + '/admin/register', user, this.noAuthHeader);
}
getUserProfile() {
return this.http.get(environment.apiBaseUrl + '/admin/userProfile');
}


//Helper Methods

setToken(token) {
localStorage.setItem('token', token);
}

getToken() {
return localStorage.getItem('token');
}

deleteToken() {
localStorage.removeItem('token');
}

getUserPayload() {
var token = this.getToken();
if (token) {
var userPayload = atob(token.split('.')[1]);
return JSON.parse(userPayload);
} else
return null;
}

isLoggedIn() {
var userPayload = this.getUserPayload();
if (userPayload)
return userPayload.exp > Date.now() / 1000;
else
return false;
}
}
*/
const program = new ProgramService();
export default program;