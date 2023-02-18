import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { StreamChat } from "stream-chat";
import { API_KEY } from '../utils/keyUtils';

const chatClient = StreamChat.getInstance(API_KEY);

const UserSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [receiver, setReceiver] = useState(null);

  const searchUsers = async () => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const response = await chatClient.queryUsers({ id: { $autocomplete: query } }, {});
    setResults(response.users);
  };

  const handleQueryChange = (text) => {
    setQuery(text);
    setReceiver(null);
    searchUsers();
  };

  const handleUserSelect = (selectedUser) => {
    setReceiver(selectedUser);
  };

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