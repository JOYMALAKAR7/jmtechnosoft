import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Users = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [currentUserId, setCurrentUserId] = useState('');

  useEffect(() => {
    const fetchCurrentUserId = async () => {
      const userId = await AsyncStorage.getItem('userEmail');
      setCurrentUserId(userId);
    };

    fetchCurrentUserId();

    const unsubscribe = firestore().collection('users').onSnapshot((snapshot) => {
      const userArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(userArray);
    });

    return () => unsubscribe();
  }, []);

  const startChat = (recipientId) => {
    navigation.navigate('Chat', { recipientId });
  };

  const filteredUsers = users.filter((user) => user.id !== currentUserId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User List</Text>
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => startChat(item.id)} style={styles.userItem}>
            <Text style={styles.userName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  userItem: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    fontSize: 25,
  },
  userName: {
    fontSize:25,
    fontWeight: 'bold',
    color:'blue'
  },
});

export default Users;
