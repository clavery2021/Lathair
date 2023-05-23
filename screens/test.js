import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { urlFor } from '../sanity';
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singleCoupon } from "../redux/basketSlice";
import { COLORS, SIZES } from "../constants";
import { FontSelection } from "../components/Font/FontSelection";
import Carousel, { Pagination } from 'react-native-snap-carousel-v4';

const CouponScreen = ({ route } ) => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { data } = route?.params;
    const [message, setMessage] = useState('');
    
    const id = data._id;
    const title = data.title;
    const image = data.image;
  
    const sendFreeCouponButton = ( ) => {
      dispatch(singleCoupon({ id, title, image, message}))
      navigation.navigate("Checkout")
  }
  
    return (
        <SafeAreaView className="flex-1 bg-white relative">
            <ScrollView className="flex-1 px-4 py-6">
                <View className="relative bg-white shadow-lg">
                    <Image
                        source={{
                        uri: urlFor(data?.image?.asset?._ref).url()
                        }}
                        
                        className="w-full h-72 object-cover rounded-2xl"
                    />
                     {message !== '' && (
                        <View style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                        }}>
                        <Text style={{
                            fontSize: SIZES.extraLarge,
                            color: COLORS.white,
                            font: fontStyle,
                            textAlign: 'center',
                            paddingHorizontal: SIZES.base,
                            borderRadius: SIZES.font,
                            overflow: 'hidden'
                        }}>{message}</Text>
                    </View>
                    )}
                    
                    <View className="absolute flex-row inset-x-0 top-5 justify-between px-6">
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Landing")}
                            className="w-10 h-10 rounded-md items-center justify-center bg-white"
                        >
                            <FontAwesome5 name="chevron-left" size={24} color="#d95da5" />
                        </TouchableOpacity>

                        <TouchableOpacity className="w-10 h-10 rounded-md items-center justify-center bg-[#d95da5]">
                            <FontAwesome5 name="book" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>

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
                    <FontSelection fontStyles={fontStyles} selectedFontStyle={fontStyle} onFontStyleChange={handleFontStyleChange} />
                    <TouchableOpacity onPress={sendFreeCouponButton} className="mt-4 px-3 py-3 rounded-lg bg-[#d95da5] items-center justify-center mb-12">
                        <Text className="text-1xl font-semibold uppercase tracking-wider text-gray-100">
                        Send Coupon
                        </Text>
                    </TouchableOpacity>
        
            </ScrollView>
        </SafeAreaView>
    );
};

export default CouponScreen;