import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import database from '@react-native-firebase/database';

const TokenList = ({ onUserTokensRetrieved, onSelectUser }) => {
  const [userTokens, setUserTokens] = useState([]);

  useEffect(() => {
    fetchUserTokens();
  }, []);

  const fetchUserTokens = async () => {
    try {
      const userNamesRef = database().ref('User_Details');

      userNamesRef.once('value')
        .then(snapshot => {
          const userNames = snapshot.val();

          const tokensArray = [];

          for (const username in userNames) {
            if (userNames[username].Token && userNames[username].email) {
              tokensArray.push({
                username,
                token: userNames[username].Token,
                email: userNames[username].email
              });
            }
          }

          setUserTokens(tokensArray);
          onUserTokensRetrieved(tokensArray);
        })
        .catch(error => {
          console.error('Error fetching user tokens:', error);
        });
    } catch (error) {
      console.error('Error fetching user tokens:', error);
    }
  };

  return (
    <View style={{borderBlockColor:'blue',borderWidth:2}}>
      <Text>Email IDs:</Text>
      {userTokens.map((user, index) => (
        <TouchableOpacity style={{}}
          key={index}
          onPress={() => onSelectUser(user)}
        >
          <Text style={{fontSize:18,color:'blue'}}>{user.email}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TokenList;
