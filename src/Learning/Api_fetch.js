import {View, TouchableOpacity, Text, StyleSheet, FlatList} from 'react-native';
import React, {useState} from 'react';

const Api_fetch = () => {
  const [posts, setPosts] = useState([]);
  const API = 'https://jsonplaceholder.typicode.com/posts';

  const fetchAPIRequest = () => {
    fetch(API, {
      method: 'GET',
      headers: {'Content-Type': 'Application/json'},
    })
      .then(Response => Response.json())
      .then(data => {
        console.log(data);
        setPosts(data)
      }).catch(error=>(console.log(error)))
  };

  const ItemView = ({item}) => {
    return (
      <View style={styles.card}>    
        <View style={styles.row}>
          <Text style={styles.title}>Id: </Text>
          <Text style={styles.title}>{item.id}</Text>
        </View>
        <Text style={styles.title}>Title: </Text>
        <Text style={styles.data}>{item.title}</Text>
        <Text style={styles.title}>Body: </Text>
        <Text style={styles.data}>{item.body}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={fetchAPIRequest} style={styles.button}>
        <Text style={styles.title}>Call Fetch API</Text>
      </TouchableOpacity>

      <FlatList data={posts || []} renderItem={ItemView} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 30,
    backgroundColor: '#D0AAA0',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#000000',
    padding: 20,
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
    marginBottom: 50,
  },
  title: {
    fontSize: 22,
    color: '#D0AAA0',
    fontWeight: 'bold',
    marginTop: 5,
  },
  data: {
    fontSize: 15,
    color: '#878381',
  },
  card: {
    backgroundColor: '#2B2B2B',
    padding: 15,
    margin: 10,
    borderRadius: 5,
  },
});

export default Api_fetch;
