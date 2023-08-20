import {View, TextInput, Text, Alert,Button, TouchableOpacity} from 'react-native';
import React, {useCallback,useEffect, useState} from 'react';
import BTN from '../../Components/BTN';
import {firebase} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


export default function Email_Auth() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  
useEffect(() => {
  GoogleSignin.configure({
    webClientId:'213999429082-8hh3k6s7akd6l8p87uv32vesd59n76h4.apps.googleusercontent.com'
  });
}, []);
  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  const login = async () => {

    if (!email || !password) {
      Alert.alert('Please fill in all the details');
    } else {
      try {
        // Sign in with email and password
        const userCredential = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        navigation.navigate('Home');
        console.log('Login successful', user.uid);
        console.log(userCredential);
        // You can navigate to the next screen or perform any other action here
      } catch (error) {
        Alert.alert(error.message);
        console.log('Login failed', error.message);
        console.log('Login failed', error);
      }
    }


  };

  return (
    <View
      style={{
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        width: '90%',
        alignSelf: 'center',
        height: '50%',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: 30,
          color: 'blue',
          fontWeight: 'bold',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
          textAlign: 'center',
          marginBottom: 30,
        }}>
        Login by Email ID
      </Text>
      <TextInput
        placeholder="Enter Email"
        onChangeText={text => setEmail(text)}
        placeholderTextColor="gray"
        keyboardType="email-address"
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          borderRadius: 10,
          borderColor: 'blue',
          borderWidth: 1,
          padding: 5,
          margin: 5,
        }}
      />
      <TextInput
        placeholder="Enter Password"
        onChangeText={text => setPassword(text)}
        placeholderTextColor="gray"
        secureTextEntry={true} // Set secureTextEntry to true for password input
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          borderRadius: 10,
          borderColor: 'blue',
          borderWidth: 1,
          padding: 5,
          margin: 5,
        }}
      />
      <BTN
        fontSize={22}
        height={50}
        press={login} // Pass the function reference here
        textColor="white"
        title="Login"
        backgroundColor="blue"
        width="80%"
      />
      <TouchableOpacity
        style={{
          marginTop: 15,
          alignContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          alignSelf:'center'
        }}
        onPress={() => {
          navigation.navigate('Signup');
        }}>
        <Text style={{fontSize: 20, color: 'blue'}}>Are you new user? </Text>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: 'red'}}>
          {' '}
          Signup{' '}
        </Text>
      </TouchableOpacity>
      <Button
      title="Google Sign-In"
      onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
    />
    </View>
  );
}
