import { FontAwesome5 } from '@expo/vector-icons';
import { Formik } from 'formik';
import { Body, Card, CardItem, H2, Row } from 'native-base';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Input } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
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
                  <H2 style={{ marginLeft: 50 }}> New Client </H2>
                </Row>
                <Text>Add a Customer manually</Text>

                <Formik initialValues={{ title: '', description: '' }}
                  onSubmit={this.onPressButton}>
                  {({ handleChange, handleSubmit, values }) => (
                    <View style={styles.formContainer}>
                    <Input placeholder='Username' onChangeText={handleChange('username')} value={values.username} />
                      <Input placeholder='Program' onChangeText={handleChange('program')} value={values.program} />
                      
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
