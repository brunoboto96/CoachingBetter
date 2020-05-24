import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Input, Button } from 'react-native-elements';

import { Row, Card, CardItem, Body, H2, Right } from 'native-base';
import { Formik } from 'formik';
import { actions } from '../components/actions';
import AsyncStorage from '@react-native-community/async-storage';
import user from '../components/user.service';

export default class HomeScreen extends React.Component {

  onPressButton = ({ username, password }) => {
    user.login(username, password)


    const { navigate } = this.props.navigation;
    navigate("Home")

  }

  constructor(props) {
    super(props);

    const { navigate } = this.props.navigation;

    this.state = {
      selectedUser: {
        username: 'user'
      },
      data: [],
      isLoading: true
    }
    user.isLoggedIn().then((userPayload) => {
      console.log("Loged in: ", userPayload)
      this.setState({ username: user.selectedUser.username })
      /*if(!userPayload) {
          //navigate authScreen
          navigate('Auth')
        }
      */
      if (userPayload) {
        //navigate home
        navigate("Home")
      }
    })
  }



  render() {
    const { data, isLoading } = this.state;

    return (
      <View style={styles.container} >
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerMain}>

          <Card>
            <CardItem>
              <Body>
                <Row>
                  <FontAwesome5 name="key" size={30} color="orange" />
                  <H2 style={{ marginLeft: 50 }}> Login </H2>
                </Row>
                <Formik initialValues={{ username: '', password: '' }}
                  onSubmit={this.onPressButton}>
                  {({ handleChange, handleSubmit, values }) => (
                    <View style={styles.formContainer}>
                      <Input placeholder='Username' onChangeText={handleChange('username')} value={values.username} />
                      <Input placeholder='Password' onChangeText={handleChange('password')} value={values.password} />
                      <Button title="Submit" onPress={handleSubmit} />
                    </View>
                  )}
                </Formik>
              </Body>
            </CardItem>
          </Card>

        </ScrollView>
      </View >
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formContainer: {
    width: '100%',
  },
  center: {
    marginHorizontal: 'auto',
  },
  contentContainer: {
    marginTop: 30,
  },
  contentContainerMain: {
    padding: 30,
  },
});
