import React from 'react'
import { View, SafeAreaView, Text, Image, StatusBar, TouchableOpacity, Button } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal, removeFromBasket } from "../redux/basketSlice";
import { urlFor } from '../sanity';
import { COLORS, SIZES, SHADOWS } from "../constants";
import { XCircleIcon } from "react-native-heroicons/outline";
import { useNavigation } from '@react-navigation/native';

const Checkout = () => {

    const basketTotal = useSelector(selectBasketTotal)
    const items = useSelector(selectBasketItems);
    // const items = useSelector(selectBasketItems);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    // const emptyBasket = () => {
    //     dispatch(removeFromBasket({ id: key }))
    //     navigation.navigate("Home")
    // } 
    
  const changeSingleCoupon = (key) => {
    dispatch(removeFromBasket({ id: key }))
    navigation.goBack
}
    
return (
    <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 bg-gray-100">
            <View className="p-5 border-b border-[#d95da5] bg-white shadow-xs">
                <View>
                    <Text className="text-lg font-bold text-center">Basket</Text> 
                    <Text className="text-center text-gray-400">
                        Send Coupon
                    </Text>
                </View>
                <TouchableOpacity className="rounded-full bg-gray-100 absolute top-3 right-5">
                    <XCircleIcon 
                    color="#d95da5" height={50} width={50} 
                    // onPress={() => changeSingleCoupon(item.id)}
                    />
                </TouchableOpacity>
            </View>
                {items?.map((item) => (
                <View 
                    className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5"
                    key={item.id}>
                    <Image 
                        source={{
                            uri: urlFor(item.image.asset._ref).url()
                        }}
                        className="h-7 w-7 bg-gray-300 p-4 rounded-full"
                    />
                    {/* (Would prefer to show the message instead of title) */}
                        <Text className="flex-1">{item.title}</Text>
                        <TouchableOpacity>
                            <Text 
                                onPress={() => changeSingleCoupon(item.id)}
                                className="text-[#d95da5]">Change</Text>
                        </TouchableOpacity>
                </View>
                ))}
                <Text className="flex-row justify-between">List of contacts</Text>
        </View>

        <View className="p-5 bg-white mt-5 space-y-4">
        <View className="flex-row justify-between">
                <Text className="text-gray-400">Sending to</Text>
                <Text className="flex-row justify-between"></Text>
                <Text className="text-gray-400">
                    "Name"
                    {/* <Currency quantity={5.99} currency="GBP" /> */}
                </Text>
            </View>
            <View className="flex-row justify-between">
                <Text className="text-gray-400">SubTotal</Text>
                <Text className="flex-row justify-between"></Text>
                <Text className="text-gray-400">
                    "Hello"
                    {/* <Currency quantity={5.99} currency="GBP" /> */}
                </Text>
            </View>
            <View className="flex-row justify-between">
                <Text className="text-gray-400">Promo / Offer Deduction</Text>
                <Text className="flex-row justify-between"></Text>
                <Text className="text-gray-400">
                    "Hello"
                    {/* <Currency quantity={5.99} currency="GBP" /> */}
                </Text>
            </View>

            <View className="flex-row justify-between">
                <Text>Order Total</Text>
                <Text className="font-extrabold">
                    "Hello"
                    {/* <Currency quantity={basketTotal + 5.99} currency="GBP" /> */}
                </Text>
            </View>
            <TouchableOpacity 
                    onPress={() => navigation.navigate("PreparingOrderScreen")}
                    className="rounded-lg bg-[#d95da5] p-4">
                    <Text className="text-center text-white text-lg font-bold">
                        Place Order
                    </Text>
            </TouchableOpacity>
        </View>
           

    </SafeAreaView>
    )
}
            export default Checkout
            
         {/* {items?.map((item, index) => (
            <View key={index}>
                <Text>Coupon Title : {item.title}</Text>
                <View style={{ width: "100%", height: 250 }}>
                    <Image
                    source={{
                        uri: urlFor(item.image.asset._ref).url()
                    }}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: "100%",
                        borderTopLeftRadius: SIZES.font,
                        borderTopRightRadius: SIZES.font,
                    }}
                    />
                </View>
          </View>
        ))} */}
