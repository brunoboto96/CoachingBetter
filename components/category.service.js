import { Platform } from 'react-native';
import url from './url';

class CategoryService {
    selectedCategory = {
        _id: '',
        name: ''
    }

    categories = {
        data: [{
            _id: '',
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
    /*
        newCategory = async (name) => {
            console.log("Create Category")
            if (Platform.OS == 'android') {
                this.backendUrl = url.getbackendURL_mobile()
            } else {
                this.backendUrl = url.getbackendURL()
            }
            await fetch(this.backendUrl + '/api/category/new', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name
                })
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log(json)
                    this.selectedCategory._id = json._id
                    this.selectedCategory.name = json.name
                    return json
                })
        }*/


    getCategories = async() => {
        if (Platform.OS == 'android') {
            this.backendUrl = url.getbackendURL_mobile()
        } else {
            this.backendUrl = url.getbackendURL()
        }
        await fetch(this.backendUrl + '/api/category/get', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json.categories)
                this.categories.data = json.categories
                console.log("this categories: ", this.categories.data)
                return json.categories
            })
            .catch((error) => console.error(error))
    }

    getCategoryByName = async(name) => {
        console.log("name: ", name)
        if (Platform.OS == 'android') {
            this.backendUrl = url.getbackendURL_mobile()
        } else {
            this.backendUrl = url.getbackendURL()
        }
        await fetch(this.backendUrl + '/api/category/getname/' + name, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => response.json())
            .then((json) => {
                console.log(json.category)
                this.selectedCategory = json.category
                console.log("this category: ", this.selectedCategory)
                return json.category
            })
            .catch((error) => console.error(error))
    }
}

const category = new CategoryService();
export default category;