import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { API_KEY } from '../utils/keyUtils';
import auth from '@react-native-firebase/auth';

const UserSearch = ({ onSelectUser }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [receiver, setReceiver] = useState(null);

  const searchUsers = async () => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }
  
    const { data: users } = await auth()
      .listUsers(1000, { email: query })
      .catch((error) => {
        console.log('Error listing users:', error);
        return { data: [] };
      });
  
    setResults(users);
  };

  const handleQueryChange = (text) => {
    setQuery(text);
    setReceiver(null);
    searchUsers();
  };

  const handleUserSelect = (selectedUser) => {
    setReceiver(selectedUser);
    onSelectUser(selectedUser);
  };

  //todo
  //When a user creates an account they make an entry for firebase and sanity db.

  //firebase will handle auth, sanity will be used to store user info:
  //username, bday, coupons sent/received, who they sent to etc

  //api searches firebase for username or email. If user doesnt exist then send as email.

  return (
    <View>
    <Text>Search for users:</Text>
    <TextInput value={query} onChangeText={handleQueryChange} />
    {receiver ? (
      <Text>You have selected user: {receiver.id}</Text>
    ) : (
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleUserSelect(item)}>
            <Text>{item.id}</Text>
          </TouchableOpacity>
        )}
      />
    )}
  </View>
  );
};


export default UserSearch;