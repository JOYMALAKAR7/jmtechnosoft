/**
 * @format
 */

import {AppRegistry, useColorScheme} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging'

import { MD3LightTheme,MD3DarkTheme ,PaperProvider} from 'react-native-paper';
import { LightScheme } from './src/Theme/LightScheme';
import { DarkScheme } from './src/Theme/DarkScheme';
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
  });
  messaging().getInitialNotification(async remoteMessage => {
    console.log('Message handled in the kill!', remoteMessage);
    Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
  });
const LighTheme={
  ...MD3LightTheme,
  colors:LightScheme
}
const DarkTheme={
  ...MD3DarkTheme,
  colors:DarkScheme
}



  export default function Main() {
   const colorScheme =useColorScheme()
   const theme =colorScheme =='dark' ? DarkTheme :LighTheme;
  return (
    <PaperProvider >
      <App />
    </PaperProvider>
  );
} 
AppRegistry.registerComponent(appName, () => Main);
