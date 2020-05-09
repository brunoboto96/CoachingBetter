import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';

const Tab = createMaterialTopTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

import { Image } from 'react-native';

export default function MaterialTopTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
navigation.setOptions({ headerTitle: props => <LogoTitle {...props} />});

  return (
    <Tab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Get Started',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-code-working" />,
        }}
      />
      <Tab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: 'Resources',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-book" />,
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

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'Homee';
    case 'Links':
      return 'Links to learn more';
  }
}
