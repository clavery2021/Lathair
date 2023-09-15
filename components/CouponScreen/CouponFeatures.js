import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import FontAwesome5 from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { urlFor } from '../../sanity';
import { COLORS, SIZES } from "../../constants";

export const CouponFeatures = ( { data, message, navigation, fontStyle }) => {

  return (
    <View className="relative bg-white shadow-lg">
    <Image
      source={{
        uri: urlFor(data?.image?.asset?._ref).url(),
      }}
      className="w-full h-72 object-cover rounded-2xl"
    />
    {message !== '' && (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text
          style={{
            fontSize: SIZES.extraLarge,
            color: COLORS.white,
            font: fontStyle,
            textAlign: 'center',
            paddingHorizontal: SIZES.base,
            borderRadius: SIZES.font,
            overflow: 'hidden',
          }}
        >
          {message}
        </Text>
      </View>
    )}
    <View className="absolute flex-row inset-x-0 top-5 justify-between px-6">
      <TouchableOpacity
        onPress={() => navigation.navigate('Landing')}
        className="w-10 h-10 rounded-md items-center justify-center bg-white"
      >
        <FontAwesome5 name="chevron-left" size={24} color="#d95da5" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('CouponBookScreen')}
        className="w-10 h-10 rounded-md items-center justify-center bg-[#d95da5]"
      >
        <FontAwesome5 name="book" size={24} color="#fff" />
      </TouchableOpacity>
    </View>

    <View className="absolute flex-row inset-x-0 bottom-5 justify-between px-6">
      <View className="flex-row space-x-2 items-center">
        <Text className="text-[12px] font-bold text-gray-100">Hello</Text>
      </View>

      <View className="px-2 py-1 rounded-md bg-[#d95da5]">
        <Text className="text-gray-100">15 days To Go</Text>
      </View>
    </View>
  </View>
  );
};

export default CouponFeatures;