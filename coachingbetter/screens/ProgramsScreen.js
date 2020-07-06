import { FontAwesome5 } from '@expo/vector-icons';
import { Body, Button, Card, CardItem, H2, Right, Row } from 'native-base';
import * as React from 'react';
import { ActivityIndicator, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import program from '../components/program.service';
import user from '../components/user.service';


export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isLoading: true
    };



  }

  componentDidMount() {

    const { navigate } = this.props.navigation;
    user.isLoggedIn().then((userPayload) => {
      this.setState({ userid: user.selectedUser._id })
      if (!userPayload) {
        //navigate authScreen
        navigate('Auth')
      } else {
        program.getPrograms(user.selectedUser._id).then((data) => {
          console.log("programdata: ", program.programs.data)
          this.setState({ data: program.programs.data });
        })
      }
    }).finally(() => {
      this.setState({ isLoading: false });
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
                  <H2 style={{ marginLeft: 50 }}> New Program</H2>
                </Row>
                <Text>Create a new Program</Text>
                <Button success block style={styles.contentContainer} onPress={() => navigate('NewProgram')} >
                  <Text style={styles.center} >Create Program</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>


          <Card>
            <CardItem>
              <Body>
                <Row>
                  <FontAwesome5 name="archive" size={30} color="orange" />
                  <H2 style={{ marginLeft: 50 }}> Your Programs</H2>
                </Row>

                <CardItem style={{ width: '100%' }}>
                  {isLoading ? <ActivityIndicator /> : (
                    <FlatList
                      data={data}
                      keyExtractor={({ _id }, index) => _id}
                      renderItem={({ item }) => (
                        <CardItem>
                          <FontAwesome5 active name="users" size={50} />
                          <Text> {item.title}</Text>
                          <Right>
                            <Text>{item.description}  </Text>
                          </Right>
                          <Button transparent
                            onPress={() => navigate("Planner", { programLabelId: item._id })}>
                            <FontAwesome5 name="edit" size={30} />
                          </Button>
                        </CardItem>
                      )}
                    />
                  )}
                </CardItem>
              </Body>
            </CardItem>
          </Card>

        </ScrollView>
      </View>
    );
  }
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
