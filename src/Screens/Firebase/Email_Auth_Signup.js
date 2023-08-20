import React, {useState} from 'react';
import {View, TextInput, Text, Alert, TouchableOpacity} from 'react-native';
import BTN from '../../Components/BTN';
import {firebase} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

export default function Email_Auth_Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const navigation = useNavigation();

  const signUp = async () => {
    if (!email || !password || !displayName) {
      Alert.alert('Please fill in all the details');
    } else {
      try {
        // Create user with email and password
        const userCredential = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password);

        // Update the user's display name
        await userCredential.user.updateProfile({
          displayName: displayName,
        });

        // Navigate to the home screen or any other desired screen after successful signup
        navigation.navigate('Home');
        console.log('Signup successful', userCredential.user.uid);
        console.log(userCredential);
      } catch (error) {
        Alert.alert(error.message);
        console.log('Signup failed', error.message);
        console.log('Signup failed', error);
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
        Signup By Email ID
      </Text>
      <TextInput
        placeholder="Enter Display Name"
        onChangeText={text => setDisplayName(text)}
        placeholderTextColor="gray"
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
        secureTextEntry={true}
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
        press={signUp} // Pass the function reference here
        textColor="white"
        title="Sign Up"
        backgroundColor="blue"
        width="80%"
      />
      <TouchableOpacity
        style={{
          marginTop: 15,
          alignContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          alignSelf: 'center',
        }}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        <Text style={{fontSize: 20, color: 'blue'}}>
          Already have any account?{' '}
        </Text>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: 'red'}}>
          {' '}
          Login{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
