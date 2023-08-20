import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import TokenList from './TokenList'; // Assuming you have this component to fetch tokens
import database from '@react-native-firebase/database';

const Notification_sender = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [userTokens, setUserTokens] = useState([]);
  const [selectedUserToken, setSelectedUserToken] = useState(null);

  useEffect(() => {
    fetchUserTokens();
  }, []);

  const fetchUserTokens = async () => {
    try {
      const tokensSnapshot = await database().ref('User_Details').once('value');
      const userTokensData = tokensSnapshot.val();

      if (userTokensData) {
        const tokensArray = Object.keys(userTokensData).map(username => ({
          username,
          token: userTokensData[username].Token,
          email: userTokensData[username].email
        }));

        setUserTokens(tokensArray);
      }
    } catch (error) {
      console.error('Error fetching user tokens:', error);
    }
  };
  const sendNotificationToUsers = async () => {
    try {
      const response = await sendNotification(userTokens);
      console.log('Notification sent to all users:', response.data);
      Alert.alert('Success', 'Notification sent to all users successfully.');
    } catch (error) {
      console.error('Error sending notification:', error);
      Alert.alert('Error', 'An error occurred while sending the notification.');
    }
  };
  
  const sendNotificationToSelectedUser = async (userToken) => {
    try {
      const response = await sendNotification([userToken]);
      console.log('Notification sent to selected user:', response.data);
      Alert.alert('Success', 'Notification sent to selected user successfully.');
    } catch (error) {
      console.error('Error sending notification:', error);
      Alert.alert('Error', 'An error occurred while sending the notification.');
    }
  };

  const sendNotification = async (tokens) => {
    const response = await axios.post(
      'https://fcm.googleapis.com/fcm/send',
      {
        registration_ids: tokens.map(token => token.token),
        notification: {
          title: title,
          body: body,
          image: 'https://webneel.com/daily/sites/default/files/images/daily/08-2018/1-nature-photography-spring-season-mumtazshamsee.jpg'
        }
      },
      {
        headers: {
          Authorization: 'key=AAAAJzG2yWk:APA91bGHw-vNkcMJ1Lokxvu8T2ncxEOt4sf9vOLd_nAYGb6jtgCVM2okABBsBbY46YeqHQNj0468BRtxZZX8618WTM1KkdZX0-CZgyYDLMrKX7beUNjLChJ-ixh0KI6cWVTSV8iStbOZ',
          'Content-Type': 'application/json'
        }
      }
    );

    return response;
  };

  return (
    <View style={styles.container}>
      <TokenList onUserTokensRetrieved={setUserTokens} onSelectUser={setSelectedUserToken} />
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter body"
        value={body}
        onChangeText={text => setBody(text)}
      />
      {selectedUserToken && (
        <Button
          title="Send Notification to Selected User"
          onPress={() => sendNotificationToSelectedUser(selectedUserToken)}
        />
      )}
      <Button
        title="Send Notification to All Users"
        onPress={sendNotificationToUsers}
      />
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20
  }
});

export default Notification_sender;

