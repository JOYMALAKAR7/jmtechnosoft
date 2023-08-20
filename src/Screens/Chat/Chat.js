import React, { useEffect, useState } from 'react';
import { View, Platform, KeyboardAvoidingView, Text } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = () => {
  const route = useRoute();
  const recipientId = route.params?.recipientId;
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userEmail');
      setUserId(storedUserId);

      if (storedUserId && recipientId) {
        const conversationId = [recipientId, storedUserId].sort().join('_');
        const unsubscribe = firestore()
          .collection('conversations')
          .doc(conversationId)
          .collection('messages')
          .orderBy('timestamp')
          .onSnapshot((snapshot) => {
            const messageArray = snapshot.docs.map((doc) => {
              const message = doc.data();
              return {
                _id: doc.id,
                text: message.text,
                createdAt: message.timestamp ? message.timestamp.toDate() : new Date(),
                user: { _id: message.sender },
              };
            });
            setMessages(messageArray.reverse()); // Reverse the order of messages
          });

        return () => unsubscribe();
      }
    };

    fetchUserId();
  }, [recipientId]);

  const onSend = async (newMessages = []) => {
    if (!userId) {
      console.log("User ID not available.");
      return;
    }

    const conversationId = [recipientId, userId].sort().join('_');
    const formattedMessages = newMessages.map((message) => {
      return {
        text: message.text,
        timestamp: firestore.FieldValue.serverTimestamp(),
        sender: userId,
      };
    });

    firestore()
      .collection('conversations')
      .doc(conversationId)
      .collection('messages')
      .add(formattedMessages[0]);

    // Don't reverse the order here, as the new message should be at the bottom
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, formattedMessages)
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{ _id: userId }}
        renderUsernameOnMessage
        showUserAvatar
        renderAvatar={(props) => (
          <View
            style={{
              backgroundColor: '#E1E1E1',
              borderRadius: 20,
              marginRight: 10,
              padding: 5,
            }}>
            {/* You can customize the avatar here */}
          </View>
        )}
        renderBubble={(props) => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#DCF8C6',
                borderRadius: 10,
                padding: 10,
              },
              left: {
                backgroundColor: 'white',
                borderRadius: 10,
                padding: 10,
              },
            }}
            textStyle={{
              right: { color: 'black' },
              left: { color: 'black' },
            }}
          />
        )}
        renderTime={(props) => (
          <Text style={{ fontSize: 12, color: '#888', marginLeft: 10, marginBottom: 5 }}>
            {props.currentMessage.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </Text>
        )}
        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={{
              backgroundColor: 'white',
              borderTopWidth: 1,
              borderTopColor: '#EEE',
              paddingHorizontal: 10,
              paddingBottom: Platform.OS === 'android' ? 5 : 0,
            }}
          />
        )}
      />
      {Platform.OS === 'android' && <KeyboardAvoidingView behavior="height" />}
    </View>
  );
};

export default Chat;
