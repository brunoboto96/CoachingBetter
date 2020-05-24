import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ProgramsScreen from '../screens/ProgramsScreen';
import LinksScreen from '../screens/LinksScreen';
import ClientsScreen from '../screens/ClientsScreen';
import BookingsScreen from '../screens/BookingsScreen';
import SessionsScreen from '../screens/SessionsScreen';
import NewProgramScreen from '../screens/NewProgramScreen';
import AuthenticateScreen from '../screens/AuthenticateScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import PlannerScreen from '../screens/PlannerScreen';
import ScheduledScreen from '../screens/ScheduledScreen';

const Tab = createMaterialTopTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TestScreen from '../screens/TestScreen';
import { createStackNavigator } from '@react-navigation/stack';

export default function MaterialTopTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: props => <LogoTitle {...props} /> });

  return (
    <Tab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      headerMode="none"
      tabBarOptions={{ showIcon: true }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        tabBarOptions={{
          labelStyle: { fontSize: 8 },
        }}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-home" />,
        }}
      />
      <Tab.Screen
        name="Programs"
        component={ProgramStackScreen}
        tabBarOptions={{
          labelStyle: { fontSize: 8 },
        }}
        options={{
          title: 'Programs',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-jet" />,
        }}
      />
      {/*
      <Tab.Screen
        name="Links"
        component={LinksScreen}
        tabBarOptions={{
          labelStyle: { fontSize: 8 },
        }}
        options={{
          title: 'Resources',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
      */}

      <Tab.Screen
        name="Auth"
        component={AuthenticateStackScreen}
        tabBarOptions={{
          labelStyle: { fontSize: 8 },
        }}
        options={{
          title: 'Auth',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-key" />,
        }}
      />
      <Tab.Screen
        name="Clients"
        component={ClientsScreen}
        tabBarOptions={{
          labelStyle: { fontSize: 8 },
        }}
        options={{
          title: 'Clients',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-people" />,
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={BookingsScreen}
        tabBarOptions={{
          labelStyle: { fontSize: 8 },
        }}
        options={{
          title: 'Bookings',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-book" />,
        }}
      />
      <Tab.Screen
        name="Sessions"
        component={SessionStackScreen}
        tabBarOptions={{
          labelStyle: { fontSize: 8 },
        }}
        options={{
          title: 'Session Planner',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-calendar" />,
        }}
      />

    </Tab.Navigator>
  );
}

const ProgramStack = createStackNavigator();
function ProgramStackScreen() {
  return (
    <ProgramStack.Navigator>
      <ProgramStack.Screen name="Programs" component={ProgramsScreen} />
      <ProgramStack.Screen name="NewProgram" component={NewProgramScreen} />
    </ProgramStack.Navigator>
  );
}

const AuthenticateStack = createStackNavigator();
function AuthenticateStackScreen() {
  return (
    <AuthenticateStack.Navigator>
      <AuthenticateStack.Screen name="Auth" component={AuthenticateScreen} />
      <AuthenticateStack.Screen name="Login" component={LoginScreen} />
      <AuthenticateStack.Screen name="Register" component={RegisterScreen} />
    </AuthenticateStack.Navigator>
  );
}

const SessionStack = createStackNavigator();
function SessionStackScreen() {
  return (
    <SessionStack.Navigator>
      <SessionStack.Screen name="Sessions" component={SessionsScreen} />
      <SessionStack.Screen name="Planner" component={PlannerScreen} />
      <SessionStack.Screen name="Scheduled" component={ScheduledScreen} />
    </SessionStack.Navigator>
  );
}

function LogoTitle() {
  return (
    <Image
      style={{ width: 120, height: 45 }}
      source={require('../assets/images/logocb.png')}
    />
  );
}
/*
function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'Links':
      return 'Links to learn more';
  }
}
*/