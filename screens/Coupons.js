import { useState } from "react";
import { Text, View, SafeAreaView, FlatList, ScrollView, SectionList, TextInput, Button } from "react-native";

import MessageCouponCard from "../components/MessageCouponCard";
import { COLORS } from "../constants";
import { urlFor } from '../sanity';

const Coupons = ({ route } ) => {
    const { data } = route.params;
    const [message, setMessage] = useState('');
    const handleMessageChange = (text) => {
      setMessage(text);
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
        <FlatList
            data={data.couponMessage}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
              <MessageCouponCard
                key={item.id}
                data={item}
                message={message}
              />
            }
        />
        </View>
        <View style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          zIndex: -1,
        }}>
          <View style={{ height: 300, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={handleMessageChange}
            value={message}
            placeholder="Enter your message"
          />
          <Button
            title="Submit"
            onPress={() => {
              // Code to display message on top of coupon image goes here
            }}
          />
        </View>
      </View>
    </SafeAreaView>
    )
}

export default Coupons