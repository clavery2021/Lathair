import React from 'react';
import { View, TextInput } from 'react-native';

const HandleCouponMessage = ({ message, handleMessageChange }) => {
  return (
    <View className=" space-y-2 mt-8 bg-gray-100 rounded-2xl px-4 py-2">
      <View className="items-center flex-row space-x-6">
        <TextInput
          style={{ height: 40 }}
          onChangeText={handleMessageChange}
          value={message}
          placeholder="Enter your message"
        />
      </View>
    </View>
  );
};

export default HandleCouponMessage;
