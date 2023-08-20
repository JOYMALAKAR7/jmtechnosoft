import React, { useEffect, useState } from 'react';
import { View, Text, Button,  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import messaging from '@react-native-firebase/messaging';
import database from '@react-native-firebase/database';
import Notification_sender from './Firebase/Notification_sender';

const Home = () => {
  const [userInfo, setUserInfo] = useState({});
  const [token, setToken] = useState('');
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    setEmail(AsyncStorage.getItem('userEmail'))
    getDeviceToken();
    
  }, []);

  useEffect(() => {
    // Fetch the stored user information from AsyncStorage
    const getUserInfo = async () => {
      const storedUserInfo = await AsyncStorage.getItem('userInfo');
      if (storedUserInfo) {
        setUserInfo(JSON.parse(storedUserInfo));
       console.log(JSON.parse(storedUserInfo))
        storeToken();
      }
    };

    getUserInfo();

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {

      // Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
      console.log(remoteMessage.notification.body)

    });

    return unsubscribe;
  }, []);

  const getDeviceToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    setToken(token);
    console.log('Device Token:', token);
  };

  const storeToken = async () => {
    try {
      if (userInfo.user?.email) {
        const add_NotificationID = database().ref(`NotificationIds/`);
        
        await add_NotificationID
          .set(`${token}`);
        console.log('Token stored successfully in NotificationIds!');
      }
  
      
  
      if (userInfo.user?.email) {
        const usrDetailsRef = database().ref(`User_Details/${userInfo.user?.email.split("@")[0]}`);
        const username = userInfo.user?.email.split("@")[0];
        
        const updatedUserInfo = {
          ...userInfo.user,
          Token: token
        };
    console.log(updatedUserInfo)
        await usrDetailsRef
          .set(updatedUserInfo);
        console.log('Token added to usrDetails successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  const handleLogout = async () => {
    try {
      // Sign out from Google Sign-In
      await GoogleSignin.signOut();
      navigation.navigate('Login');
      console.log('Signed out from Google Sign-In.');

      // Remove the stored user information from AsyncStorage
      await AsyncStorage.removeItem('userInfo');
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('userEmail');
      await AsyncStorage.clear();
      console.log('User information cleared from AsyncStorage.');

      // Navigate back to the login or sign-in screen
      
    } catch (error) {
      console.log('Error occurred during logout:', error);
    }
  };
  const goToUser =() =>{
    navigation.navigate('Users');
  }
  return (
    <View style={{flex:1}}>
      <View style={{flexDirection:'row',alignSelf:'flex-end',margin:5}}>
      <Button title="Logout" onPress={handleLogout} />
      </View >
      
     
      <View style={{borderBlockColor:'green',borderWidth:2,borderRadius:20,padding:10}}>
      <Text style={{color:'purple',fontSize:22}}>Welcome JMTechnosoft</Text>
      <Text style={{color:'purple'}}>Your Details:</Text> 
      <Text style={{color:'purple'}}>Name: {userInfo.user?.name}</Text>
      <Text style={{color:'purple',marginBottom:20}}>email: {}</Text>
      <Button style={{color:'purple',padding:20,borderRadius:10}} title="Chat" onPress={goToUser} />
      </View>
      <View>
        {userInfo.user?.email=="malakarjoy4@gmail.com"? <Notification_sender />  : null }
      

      </View>
    
      {/* Add other user details as needed */}

      {/* Logout button */}
      
    </View>
  );
};

export default Home;
