import { View, Text, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { selectCouponBookItems, selectCouponBookTotal } from "../../redux/couponBookSlice"
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const BookIcon = () =>{
    const items = useSelector(selectCouponBookItems);
    const navigation = useNavigation();
    // const basketTotal = useSelector(selectCouponBookTotal)

    //Hides basket until something is added
    // if (items.length === 0 ) return null;
    
    return (
        <View className="absolute bottom-10 w-full z-50">
            <TouchableOpacity 
                // onPress={() => navigation.navigate("Basket")}
                className="mx-5 bg-[#00CCBB] p-4 rounded-lg flex-row items-center space-x-1">
                <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">
                    {items?.length}
                </Text>
                <Text className="flex-1 text-white font-extrabold text-lg text-center">
                    View Basket
                </Text>
                <Text className="text-lg text-white font-extrabold">
                    <FontAwesome5 name="book" size={24} color="#fff" />
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default BookIcon;