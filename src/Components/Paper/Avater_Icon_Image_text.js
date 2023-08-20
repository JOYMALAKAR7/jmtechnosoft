import { View } from 'react-native';
import { Avatar } from 'react-native-paper';
import React from 'react';
// Import the image source
import joytechnosoftLogo from '../../Images/joytechnosoft_logo.png'; // Adjust the path accordingly

export default function Avater_Icon_Image_text() {
  return (
    <View>
      <Avatar.Icon size={60} icon="folder" style={{ marginTop: 20 }} />
       <Avatar.Text size={60} label="XD" style={{ marginTop: 20 }} />
      {/* Use the imported image source */}
      <Avatar.Image size={60} style={{ marginTop: 20 }}  source={require('../../Images/joytechnosoft_logo.png')} />
    </View>
  );
}
