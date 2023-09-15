import React from 'react';
import { View, Text } from 'react-native';
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const CouponRatings = ({ rating, priceLevel }) => {
  return (
    <View className="mt-4 flex-row items-center justify-between ml-4 mr-8">
      <View className=" flex-row items-center space-x-2">
        <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
          <FontAwesome name="star" size={24} color="#D58574" />
        </View>
        <View>
          <Text className="text-[#515151]">
            {rating}
          </Text>
          <Text className="text-[#515151]">Coupon Ratings</Text>
        </View>
      </View>

      <View className=" flex-row items-center space-x-4">
        <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
          <MaterialIcons name="attach-money" size={24} color="#D58574" />
        </View>
        <View>
          <Text className="text-[#515151]">
            {priceLevel}
          </Text>
          <Text className="text-[#515151]">Price Level</Text>
        </View>
      </View>
    </View>
  );
};

export default CouponRatings;
