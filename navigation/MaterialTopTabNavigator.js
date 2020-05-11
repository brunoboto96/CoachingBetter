import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ProgramsScreen from '../screens/ProgramsScreen';
import LinksScreen from '../screens/LinksScreen';
import ClientsScreen from '../screens/ClientsScreen';
import BookingsScreen from '../screens/BookingsScreen';
import SessionsScreen from '../screens/SessionsScreen';


const Tab = createMaterialTopTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TestScreen from '../screens/TestScreen';

export default function MaterialTopTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: props => <LogoTitle {...props} /> });

  return (
    <Tab.Navigator
     initialRouteName={INITIAL_ROUTE_NAME}
     headerMode="none"
     tabBarOptions = {{showIcon:true}}
     >
     <Tab.Screen
       name="Home"
       component={HomeScreen}
       tabBarOptions={{
         labelStyle: { fontSize: 4 },
       }} 
       options={{
         title: 'Home',
         tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-home" />,
       }}
     />
     <Tab.Screen
       name="Programs"
       component={ProgramsScreen}
       tabBarOptions={{
         labelStyle: { fontSize: 4 },
       }} 
       options={{
         title: 'Programs',
         tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-jet" />,
       }}
     />
      <Tab.Screen
        name="Links"
        component={LinksScreen}
        tabBarOptions={{
          labelStyle: { fontSize: 4 },
        }} 
        options={{
          title: 'Resources',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
        }}
      />
      <Tab.Screen
        name="Clients"
        component={ClientsScreen}
        tabBarOptions={{
          labelStyle: { fontSize: 4 },
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
          labelStyle: { fontSize: 4 },
        }} 
        options={{
          title: 'Bookings',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="ios-book" />,
        }}
      />
      <Tab.Screen
        name="Sessions"
        component={SessionsScreen}
        tabBarOptions={{
          labelStyle: { fontSize: 4 },
        }} 
        options={{
          title: 'Session Planner',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-calendar" />,
        }}
      />

    </Tab.Navigator>
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