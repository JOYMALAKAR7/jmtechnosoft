import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the image animation
    startAnimation();
    // Check login after 2 seconds
  
    setTimeout(() => {
      checkLogin();
    }, 2000);
  }, []);

  const checkLogin = async () => {
    console.log('login')
    const userInfo = await AsyncStorage.getItem('userInfo');
    if (userInfo !== null) {
      navigation.navigate('Home');
    } else {
      navigation.navigate('Login');
    }
  };

  const startAnimation = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
        
      <Animated.Image
        source={require('../Images/joytechnosoft_logo.png')}
        style={{ transform: [{ rotate: spin }], height: 250, resizeMode: 'contain' }}
        resizeMode="contain"
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
   
  },
});

export default Splash;
