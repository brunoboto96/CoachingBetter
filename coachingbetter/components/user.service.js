import AsyncStorage from '@react-native-community/async-storage';
import { Platform } from 'react-native';
import url from '../components/url';

class UserService {
    selectedUser = {
        _id: '',
        name: '',
        username: '',
        email: '',
        token: '',
        account_type: ''
    }

    errors = {
        message: '',
        status: ''
    }
    errors2 = {
        message: ''
    }

    backendUrl = ''

    login(username, password) {
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

    register = async(name, username, password, email, account_type) => {
        console.log("register")
        if (Platform.OS == 'android') {
            this.backendUrl = url.getbackendURL_mobile()
        } else {
            this.backendUrl = url.getbackendURL()
        }
        await fetch(this.backendUrl + '/api/user/register', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    username: username,
                    email: email,
                    password: password,
                    account_type: account_type
                })
            })
            .then((response) => {
                response.clone().json()
                console.log("res.json: ", response.json())
                console.log("res: ", response)
                this.errors.status = response.status

            })
            .then((json) => {
                console.log(json)
                this.errors2.message = JSON.stringify(json)
                console.log("errro: ", this.errors2.message)
            })
    }

    logout() {
        try {
            AsyncStorage.removeItem('@storage_Key')
            console.log("storage_key removed")
        } catch (e) {
            console.log(e)
        }
    }

    storeToken = async(value) => {
        try {
            await AsyncStorage.setItem('@storage_Key', value)
        } catch (e) {
            console.log(e)
        }
    }

    getToken = async() => {
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

    isLoggedIn = async() => {
        return this.getToken()
    }

    getUser = async(token) => {
        console.log("token sent: ", token)
        if (Platform.OS == 'android') {
            this.backendUrl = url.getbackendURL_mobile()
        } else {
            this.backendUrl = url.getbackendURL()
        }
        await fetch(this.backendUrl + '/api/user/userProfile', {
                method: 'GET',
                headers: {
                    'Authorization': token,
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((json) => {
                this.selectedUser._id = json.user._id
                this.selectedUser.username = json.user.username
                this.selectedUser.email = json.user.email
                console.log("response: ", json)
                console.log("_id: ", this.selectedUser._id)
                return json
            })
            .catch((error) => console.error(error))
    }
}

const user = new UserService();
export default user;

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
}*/