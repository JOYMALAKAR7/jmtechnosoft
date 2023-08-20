import { View, Text, Alert } from 'react-native';
import React, { useEffect } from 'react';
import AppNavigator from './src/Navigaton/AppNavigator';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';
import Api_fetch from './src/Learning/Api_fetch';
import API_Axios from './src/Learning/API_Axios';
import Home from './src/Components/Paper/Home';
import Splash from './src/Screens/Splash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });
  
  useEffect(() => {
    getDeviceToken();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  const getDeviceToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log(token);

    // Store the token in the database
    const reference = database().ref('device/token');
    reference.set(token)
      .then(() => {
        console.log('Token stored successfully!');
       
      })
      .catch((error) => {
        console.error('Error storing token:', error);
      });
  };
  return( <GestureHandlerRootView style={{ flex: 1 }}>
    <AppNavigator />
    </GestureHandlerRootView>
    )
 


};

export default App;
