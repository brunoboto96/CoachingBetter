import { FontAwesome5 } from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker';
import { Body, Button, Card, CardItem, H2, H3, Row } from 'native-base';
import * as React from 'react';
import { Platform, StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import activity from '../components/activity.service';
import category from '../components/category.service';
import modules from '../components/modules.service';
import program from '../components/program.service';
import session from '../components/session.service';
import user from '../components/user.service';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      programLabel: [],
      programsData: [],
      programItems: [],
      sessionsData: [],
      categories: [],
      selectedCategory: [],
      selectedSession: [],
      isLoading: true,
      program: 'Body Workout',
      session_number: 1
    }


    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event = {}) {
    const name = event.target && event.target.name;
    const value = event.target && event.target.value;

    this.setState({ [name]: value });
  }

  componentDidMount() {

    const { programLabelId } = this.props.route.params;

    console.log("pre param_programLabelId: ", programLabelId)
    user.isLoggedIn().then((userPayload) => {
      this.setState({ userid: user.selectedUser._id })
      if (!userPayload) {
        //navigate authScreen
        navigate('Auth')
      } else {
        if (programLabelId) {
          program.getProgramsById(programLabelId).then((data) => {
            console.log("programdata: ", program.programs.data)
            this.setState({ programLabel: program.programs.data });
          })
        }
        program.getPrograms(user.selectedUser._id).then((data) => {
          this.setState({ programsData: program.programs.data });
          let roleIndex = 0
          for (let i = 0; i < this.state.programsData.length; i++) {
            if (this.state.programsData[i]._id == programLabelId) {
              roleIndex = i
            }
          }
          this.state.programsData.unshift(this.state.programsData.splice(roleIndex, 1)[0])
        })
        session.getSessions(programLabelId).then((data) => {
          this.setState({ sessionsData: session.sessions.data });
        })
      }
    }).finally(() => {
      this.setState({ isLoading: false });
    })
  }

  changeProgram(itemValue) {
    for (let i = 0; i < this.state.programsData.length; i++) {
      if (this.state.programsData[i]._id == itemValue) {
        this.state.programsData.unshift(this.state.programsData.splice(i, 1)[0])
        console.log("programsdata changed: ", this.state.programsData[0])
        console.log("programsdata changedl: ", this.state.programLabel)
        return this.state.programsData[0]
      }
    }
  }

  changeSession(itemValue) {
    for (let i = 0; i < this.state.sessionsData.length; i++) {
      if (this.state.sessionsData[i]._id == itemValue) {
        this.state.sessionsData.unshift(this.state.sessionsData.splice(i, 1)[0])
        console.log("sessionsdata changed: ", this.state.sessionsData[0])
        console.log("sessionsdata changedl: ", this.state.sessionLabel)
        return this.state.sessionsData[0]
      }
    }
  }

  newSession = () => {
    category.getCategoryByName(this.state.category_name).then((data) => {
      this.state.selectedCategory = data
      session.newSession(this.state.session_title, this.state.session_description, category.selectedCategory._id, this.state.programsData[0]._id).then((data) => {
        this.setState(this.state.selectedSession, data)
        this.newModule()
      })
    })
  }

  newModule = () => {
    modules.newModules(this.state.module_explanation, session.selectedSession._id).then((data) => {
      activity.newActivity(this.state.activity_name, this.state.activity_description, modules.selectedModule._id).then((data) => {
        this.state.selectedModule = data
        return true
      })
    })
  }

  newModuleButton = () => {
    modules.newModules(this.state.module_explanation, this.state.selectedSession._id).then((data) => {
      activity.newActivity(this.state.activity_name, this.state.activity_description, this.state.selectedModule._id).then((data) => {
        this.state.selectedModule = data
        return false
      })
    })
  }

  predictions = () => {
    predictions.makePrediction().then((data) => {
      alert("Predictions: " + data)
    })
  }

  render() {

    const { programLabelId } = this.props.route.params;
    const { data, isLoading } = this.state;
    const { navigate } = this.props.navigation;

    console.log("param_programLabelId: ", programLabelId)
    let sets = [];
    for (let i = 0; i < this.state.addSetsCounter; i++) {
      sets.push(<AddSet key="AddSet-{i}" />);
    }


    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerMain}>

          <Card>
            <CardItem>
              <Body>
                <Row>
                  <FontAwesome5 name="archive" size={30} color="orange" />
                  <H2 style={{ marginLeft: 50 }}> Program</H2>
                </Row>
                <CardItem>
                  <Picker
                    selectedValue={this.state.programsData[0]}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState(this.changeProgram(itemValue))
                    }
                  >
                    {this.state.programsData.map((item, index) => {
                      console.log(item.title + index)
                      return (<Picker.Item label={item.title} value={item._id} key={index} />)
                    })}
                  </Picker>
                </CardItem>
              </Body>
            </CardItem>
          </Card>

          <Card>
            <CardItem>
              <Body>
                <Row>
                  <FontAwesome5 name="cubes" size={30} color="orange" />
                  <H2 style={{ marginLeft: 50 }}> Session {this.state.session_number}</H2>
                </Row>
                <CardItem>
                  <H3>Pick a Session:</H3>
                  <Picker
                    selectedValue={this.state.sessionsData[0]}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) =>
                      this.setState(this.changeSession(itemValue))
                    }
                  >
                    {this.state.sessionsData.map((item, index) => {
                      console.log(item.title + index)
                      return (<Picker.Item label={item.title} value={item._id} key={index} />)
                    })}
                  </Picker>
                </CardItem>

                <CardItem><H3>Or create a new Session:</H3></CardItem>
                <CardItem><Text>Title </Text></CardItem>
                <CardItem style={{ width: '100%' }}>
                  <TextInput
                    style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={session_title => this.setState({ session_title })}
                    value={this.state.session_title} placeholder="Leg Workout"
                  />
                </CardItem>
                <CardItem><Text>Description </Text></CardItem>
                <CardItem style={{ width: '100%' }}>
                  <TextInput
                    style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={session_description => this.setState({ session_description })}
                    value={this.state.session_description} placeholder="Learn how to build lower body muscle"
                  />
                </CardItem>
                <CardItem><Text>Category </Text></CardItem>
                <CardItem style={{ width: '100%' }}>
                  <TextInput
                    style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={category_name => this.setState({ category_name })}
                    value={this.state.category_name} placeholder="Fitness"
                  />
                </CardItem>

                <CardItem><H3>Module:</H3></CardItem>
                <CardItem><Text>Explanation </Text></CardItem>
                <CardItem style={{ width: '100%' }}>
                  <TextInput
                    style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={module_explanation => this.setState({ module_explanation })}
                    value={this.state.module_explanation} placeholder="The most obvious benefit of squats is building your leg muscles – quadriceps, hamstrings, and calves. These drills also create an anabolic environment, which promotes body-wide muscle building, improving muscle mass. Squats, and all of their variations, are a great exercise for the whole body."
                  />
                </CardItem>
                <CardItem><H3>Activity:</H3></CardItem>
                <CardItem><Text>Exercise Name</Text></CardItem>
                <CardItem style={{ width: '100%' }}>
                  <TextInput
                    style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={activity_name => this.setState({ activity_name })}
                    value={this.state.activity_name} placeholder="Squat"
                  />
                </CardItem>
                <CardItem><Text>Exercise Description</Text></CardItem>
                <CardItem style={{ width: '100%' }}>
                  <TextInput
                    style={{ width: '100%', height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={activity_description => this.setState({ activity_description })}
                    value={this.state.activity_description} placeholder="12 Reps : 3 Sets"
                  />
                </CardItem>
                <CardItem>
                  <Button info block style={styles.contentContainer} onPress={() => this.predictions()} >
                    <Text style={styles.center} >Predict Improvements</Text>
                  </Button>
                </CardItem>
                <CardItem>
                  <Button success block style={styles.contentContainer} onPress={() => this.newModuleButton()} >
                    <Text style={styles.center} >Insert Module</Text>
                  </Button>
                  <Button warning block style={styles.contentContainer} onPress={() => {
                    if (this.newSession()) {
                      //navigate("Programs") 
                      return
                    }

                  }} >
                    <Text style={styles.center} >New Session</Text>
                  </Button>
                </CardItem>

                {/*
                <AddSet />
                <Button success block style={styles.contentContainer}
                  onPress={() => {
                    //this.setState({ addSetsCounter: this.state.addSetsCounter });
                    //console.log(this.state.addSetsCounter)
                    //console.log(this.state.session_title)
                  }} >
                  <Text>Add More</Text>
                </Button>
                <Button success block style={styles.contentContainer} onPress={() => navigate('NewProgram')} >
                  <Text style={styles.center} >Create Program</Text>
                </Button>
              */}
              </Body>
            </CardItem>
          </Card>

        </ScrollView>
      </View >
    );
  }
}

const AddSet = () => {
  return (
    <Text>Hello</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
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
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  drawerImage: {
    height: 150,
    width: 150,
    borderRadius: 75
  },


  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
