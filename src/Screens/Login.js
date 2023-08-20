import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Email_Auth from './Firebase/Email_Auth_Login.js'
import Email_Auth_googleLogin from './Firebase/Email_Auth_GoogleLogin.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = () => {
  const navigation = useNavigation();
  
  return (
    <View style={{flex:1,justifyContent:'center'}}>
      {/* <Email_Auth /> */}
      <Email_Auth_googleLogin></Email_Auth_googleLogin>
    </View>
  )
}

export default Login