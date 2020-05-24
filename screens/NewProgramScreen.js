import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { Input, Button } from 'react-native-elements';

import { Row, Card, CardItem, Body, H2, Right } from 'native-base';
import { Formik } from 'formik';
import program from '../components/program.service';
import user from '../components/user.service';


export default class HomeScreen extends React.Component {

  onPressButton = ({ title, description, type, price }) => {
    const { goBack } = this.props.navigation;

    program.newProgram(title, description, type, price, this.state.userid)
    goBack()
  }

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true,
      userid: ''
    };

    user.isLoggedIn().then((userPayload) => {
      console.log("Loged in: ", userPayload)
      this.setState({ userid: user.selectedUser._id })
      console.log(this.state.userid)
      console.log(user.selectedUser._id)
      if (!userPayload) {
        //navigate authScreen
        navigate('Auth')
      }

    })
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
                  <FontAwesome5 name="plus-circle" size={30} color="orange" />
                  <H2 style={{ marginLeft: 50 }}> New Program </H2>
                </Row>
                <Text>Create a new Program</Text>

                <Formik initialValues={{ title: '', description: '' }}
                  onSubmit={this.onPressButton}>
                  {({ handleChange, handleSubmit, values }) => (
                    <View style={styles.formContainer}>
                      <Input placeholder='Title' onChangeText={handleChange('title')} value={values.title} />
                      <Input placeholder='Description' onChangeText={handleChange('description')} value={values.description} />
                      <Input placeholder='Type' onChangeText={handleChange('type')} value={values.type} />
                      <Input placeholder='Price' onChangeText={handleChange('price')} value={values.price} />
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
