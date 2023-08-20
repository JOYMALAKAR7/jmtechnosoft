import React, { useState } from 'react';
import { View } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
const userId = uuid.v4();
GoogleSignin.configure({
  // Your configuration
});

const GoogleSignInButton = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({});

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInformation = await GoogleSignin.signIn();
     

      console.log('User Info', userInformation);
      if (userInformation) {
        // Store user information in AsyncStorage
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInformation));
        await AsyncStorage.setItem('userEmail', userInformation.user.email);
        await AsyncStorage.setItem('userId', userId);
console.log( userInformation.user.email)
console.log( userInformation.user)
firestore().collection('users').doc(userInformation.user.email).set({
  name:userInformation.user.name,
  email:userInformation.user.email,
  userId:userId
  
}).then(() => {
 

})
.catch(error => {
  console.log("Error for firebase db", error.message);
});
        // Navigate to the Home screen
        navigation.navigate('Home');
      }
    } catch (error) {
      // ... (your previous error handling)
    }
  };

  return (
    <View>
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />
    </View>
  );
};

export default GoogleSignInButton;