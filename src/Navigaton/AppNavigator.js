import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Splash from '../Screens/Splash';
import Login from '../Screens/Login';
import Signup from '../Screens/Signup';
import Home from '../Screens/Home';
import Users from '../Screens/Chat/Users';
import Chat from '../Screens/Chat/Chat';
const Stack =createNativeStackNavigator();
const AppNavigator = () => {
  return (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Splash' component={Splash} options={{headerShown: false}} />
      <Stack.Screen name='Login' component={Login} options={{headerShown: false}}/>
      <Stack.Screen name='Signup' component={Signup} />
          <Stack.Screen name='Home' component={Home} options={{headerShown: false}}/>
          <Stack.Screen name='Users' component={Users} options={{headerShown: true}}/>
          <Stack.Screen name='Chat' component={Chat} options={{headerShown: true}}/>
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default AppNavigator