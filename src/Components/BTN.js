import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function BTN({ margin,title, press, backgroundColor, width, height, textColor, fontSize }) {
  return (
    <View>
      <TouchableOpacity
        style={{
          backgroundColor: backgroundColor,
          borderRadius: 10,
          alignItems: 'center',
          width: width,
          height: height,
          padding: 10,
          alignSelf:'center',
          marginTop:10
          
        }}
        onPress={press}
      >
        <Text style={{ fontSize: fontSize, color: textColor ,alignSelf:'center',fontWeight:'bold'}}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}
