import { FontAwesome5 } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { Body, Button, Card, CardItem, H2, Input, Item, Right, Row } from 'native-base';
import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import user from '../components/user.service';


export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);

    const { navigate } = this.props.navigation;

    this.state = {
      selectedUser: {
        _id: '',
        username: 'user'
      },
      data: [],
      isLoading: true
    }
    user.isLoggedIn().then((userPayload) => {
      console.log("Loged in: ", userPayload)
      this.setState({ _id: user.selectedUser._id })
      if (!userPayload) {
        //navigate authScreen
        navigate('Auth')
      }
    })
  }

  shareCode() {
    alert("Share code: " + this.state._id)
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerMain}>
          <Card>
            <CardItem>
              <Body>
                <Row>
                  <FontAwesome5 name="plus-circle" size={30} color="orange" />
                  <H2 style={{ marginLeft: 50 }}> New Client</H2>
                </Row>
                <Text>You can add a new Client here or share your code</Text>
                <Button success block style={styles.contentContainer} >
                  <Text style={styles.center} >Add Client</Text>
                </Button>
                <Button info block style={styles.contentContainer} onPress={() => this.shareCode()}>
                  <Text style={styles.center} >Share Code</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>


          <Card>
            <CardItem>
              <Body>
                <Row>
                  <FontAwesome5 name="users" size={30} color="orange" />
                  <H2 style={{ marginLeft: 50 }}> Your Clients</H2>
                </Row>
                <CardItem searchBar rounded style={{ flex: 1, flexDirection: 'column', alignSelf: 'stretch' }}>
                  <Item style={{ width: '100%' }}>
                    <FontAwesome5 name="users" />
                    <Input placeholder="Search" />
                    <Button bordered style={{ padding: 5 }}>
                      <FontAwesome5 name="search" />
                    </Button>
                  </Item>
                </CardItem>
                <CardItem>
                  <FontAwesome5 active name="user-ninja" />
                  <Text>John Doe</Text>
                  <Right >
                    <FontAwesome5 name="chevron-circle-right" />
                  </Right>
                </CardItem>
                <CardItem>
                  <FontAwesome5 active name="user-ninja" />
                  <Text>John Steve</Text>
                  <Right >
                    <FontAwesome5 name="chevron-circle-right" />
                  </Right>
                </CardItem>
                {/* Use FlatList maybe */}
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem>
              <Body>
                <Row>
                  <FontAwesome5 name="users" size={30} color="orange" />
                  <H2 style={{ marginLeft: 50 }}> Old Clients</H2>
                </Row>
                <CardItem searchBar rounded style={{ flex: 1, flexDirection: 'column', alignSelf: 'stretch' }}>
                  <Item style={{ width: '100%' }}>
                    <FontAwesome5 name="users" />
                    <Input placeholder="Search" />
                    <Button bordered style={{ padding: 5 }}>
                      <FontAwesome5 name="search" />
                    </Button>
                  </Item>
                </CardItem>
                <CardItem>
                  <FontAwesome5 active name="user-ninja" />
                  <Text>John Doe</Text>
                  <Right >
                    <FontAwesome5 name="chevron-circle-right" />
                  </Right>
                </CardItem>
              </Body>
            </CardItem>
          </Card>





        </ScrollView>
      </View>

    );
  }
}


HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
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
  }
});
