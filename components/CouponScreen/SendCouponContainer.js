import { View, Text, TouchableOpacity } from 'react-native';

export const SendCouponContatiner = ({ sendFreeCouponButton, addToCouponBookButton }) => {
    return (

        <View className="mt-4 flex-row items-center justify-between ml-4 mr-8">
        <TouchableOpacity onPress={sendFreeCouponButton} className="mt-4 px-3 py-3 rounded-lg bg-[#d95da5] items-center justify-center mb-12">
            <Text className="text-1xl font-semibold uppercase tracking-wider text-gray-100">
                Send Coupon
            </Text>
        </TouchableOpacity>
        {/* Testing */}
        <TouchableOpacity onPress={addToCouponBookButton} className="mt-4 px-3 py-3 rounded-lg bg-[#d95da5] items-center justify-center mb-12">
            <Text className="text-1xl font-semibold uppercase tracking-wider text-gray-100">
                Add to book
            </Text>
        </TouchableOpacity>
    </View>
    )
}