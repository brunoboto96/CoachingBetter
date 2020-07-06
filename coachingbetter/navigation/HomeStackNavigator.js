import LinksScreen from '../screens/LinksScreen'

function MainStackNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='Home'
                    component={Home}
                    options={{ title: 'Home Screen' }}
                />
                <Stack.Screen
                    name='Detail'
                    component={LinksScreen}
                    options={{ title: 'Detail Screen' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}