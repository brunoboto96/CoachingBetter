import { FontAwesome5 } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { Body, Button, Card, CardItem, H2, H3, Row } from 'native-base';
import * as React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


export default class HomeScreen extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainerMain}>
          <Card>
            <CardItem>
              <Body>
                <Row>
                  <FontAwesome5 name="book-open" size={30} color="orange" />
                  <H2 style={{ marginLeft: 50 }}> Bookings</H2>
                </Row>
                <Text>You can check your bookings here</Text>
            <CardItem>
              <View style={{ flex: 1, alignItems: 'center' }}>
                <Button transparent style={{ padding: 10, paddingTop: 50 }} onPress={() => navigate("Scheduled")}><FontAwesome5 name="clock" size={100} color="black" /></Button>
                <Text style={{ marginTop: 50 }}> Scheduled Bookings</Text>
              </View>
            </CardItem>
              </Body>
            </CardItem>
          </Card>


          <Card>
            <CardItem>
              <Body>
                <Row style={{ marginBottom: 30  }}>
                  <FontAwesome5 name="users" size={30} color="orange" />
                  <H2 style={{ marginLeft: 50 }}> Your Bookings</H2>
                </Row>
                <ScrollView>
                  <CardItem bordered>
                    <FontAwesome5 active name="user-ninja" />
                    <Text>John Doe</Text>
                    <H3>09/05/2020</H3>
                    <Button success style={{marginHorizontal: 10, padding: 5}}><Text>Approve</Text></Button>
                    <Button danger style={{padding:5}}><Text>Reject</Text></Button>
                  </CardItem>
                </ScrollView>
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
