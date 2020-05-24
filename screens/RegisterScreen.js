import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Input, Button } from 'react-native-elements';

import { Row, Card, CardItem, Body, H2, Right } from 'native-base';
import { Formik } from 'formik';
import user from '../components/user.service';


export default class HomeScreen extends React.Component {

  onPressButton = ({ name, username, email, password }) => {
    user.register(name, username, password, email, 'coach').then(() => {
      if (user.errors.status != 200) {
        console.log(user.errors.status)
        alert(user.errors.message)
      }
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isLoading: true
    };

    user.logout()


  }



  render() {
    const { data, isLoading } = this.state;
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerMain}>

          <Card>
            <CardItem>
              <Body>
                <Row>
                  <FontAwesome5 name="key" size={30} color="orange" />
                  <H2 style={{ marginLeft: 50 }}> Register</H2>
                </Row>
                <Formik initialValues={{ name: '', username: '', email: '', password: '' }}
                  onSubmit={this.onPressButton}>
                  {({ handleChange, handleSubmit, values }) => (
                    <View style={styles.formContainer}>
                      <Input placeholder='Name' onChangeText={handleChange('name')} value={values.name} />
                      <Input placeholder='Username' onChangeText={handleChange('username')} value={values.username} />
                      <Input placeholder='Email' onChangeText={handleChange('email')} value={values.email} />
                      <Input placeholder='Password' secureTextEntry={true} onChangeText={handleChange('password')} value={values.password} />
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
