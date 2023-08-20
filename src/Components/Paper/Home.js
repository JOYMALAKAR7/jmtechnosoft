import {View, Text, useColorScheme} from 'react-native';
import React from 'react';

import {useTheme} from 'react-native-paper';
import TopBar from './TopBar';
import ButtonBar from './ButtonBar';
import Avater_Icon_Image_text from './Avater_Icon_Image_text';
export default function Home() {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  return (
    <View
      style={{
        backgroundColor: theme.colors.background,
        padding: 16,
        height: '100%',
      }}>
        <TopBar /> 
        <ButtonBar />
       <Avater_Icon_Image_text />
    </View>
  );
}
