import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const CouponMenuContainer = ( { title, imageSrc, category, onPress }) => {

    return ( 
        <TouchableOpacity onPress={onPress} className="items-center justify-center space-y-2">
            <View
                className={`w-40 h-40 p-2 shadow-sm rounded-full items-center justify-center 
                ${category === title.toLowerCase() ? "bg-gray-200" : "" }`}
            >
                <Image source={imageSrc} className="w-full h-full object-contain" />
            </View>
            <Text className="text-[#d95da5] text-l font-semibold">{title}</Text>
        </TouchableOpacity>
    );
};

export default CouponMenuContainer;