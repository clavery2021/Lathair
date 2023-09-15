import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const CouponDescription = ( {data} ) => {

  return (
    <View className="mt-6">
        <Text className="text-[#d95da5] text-[24px] font-bold">
            {data?.title}
        </Text>
        <View className="flex-row items-center space-x-2 mt-2">
            <FontAwesome name="gift" size={25} color="#8C9EA6" />
            <Text className="text-[#8C9EA6] text-[20px] font-bold">
                Valentines Day
            </Text>
        </View>
    </View>
  )
}

export default CouponDescription;