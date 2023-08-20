import { View, Text } from 'react-native'
import React from 'react'

import { Appbar,useTheme } from 'react-native-paper';
const TopBar = () => {
    const theme = useTheme();
  return (
    <Appbar.Header style={{backgroundColor:theme.colors.elevation.level3}}>
    <Appbar.BackAction onPress={() => {}} />
    <Appbar.Content title="Title" />
    <Appbar.Action icon="calendar" onPress={() => {}} />
    <Appbar.Action icon="magnify" onPress={() => {}} />
  </Appbar.Header>
  )
} 

export default TopBar