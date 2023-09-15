import { useState, useEffect, useContext } from "react";
import { View, SafeAreaView, Text, Image, StatusBar, TouchableOpacity, Button } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal, removeFromBasket, clearBasket } from "../redux/basketSlice";
import { urlFor } from '../sanity';
import { useNavigation } from '@react-navigation/native';
import UserSearch from "../components/UserSearch";
import sanityClient from "../sanity";
import uuid from 'react-native-uuid';
import { useAuth } from '../contexts/useAuth';
import { SANITY_EDIT_KEY } from "../utils/keyUtils";
import { isRejected } from "@reduxjs/toolkit";

const Checkout = () => {
    const basketTotal = useSelector(selectBasketTotal)
    const items = useSelector(selectBasketItems);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [receiver, setReceiver] = useState(null);
    const newId = uuid.v4();
    const { user } = useAuth();
    const userId = user?.uid;

    const newCoupon = {
        _type: 'sendCoupon',
        id: items[0]?.id,
        sender: userId,
        receiver: "Receiver",
        image: items[0]?.image,
        message: items[0]?.message,
        categoryTitle : items[0]?.message
    }

    const handlePlaceOrder = async () => {
        // if (couponDetails.receiver) {
            const config = {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${SANITY_EDIT_KEY}`
              }
            };
            console.log(newCoupon);
            sanityClient.create(newCoupon, config)
              .then(res => {
                dispatch(clearBasket());
                console.log(`Coupon Sent with id : ${newId}`);
              })
              .catch(err => {
                console.error('Error sending Coupon', err);
              });
            navigation.navigate("PreparingOrder");
        //   } else {
        //     alert("A receiver must be selected before placing an order.");
        //   }
      }
    
  const changeSingleCoupon = (key) => {
    dispatch(removeFromBasket({ id: key }))
    //This deleted each coupon 1 by 1 without going back?
    navigation.goBack
}

return (
    <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 bg-gray-100">
            <View className="p-5 border-b border-[#d95da5] bg-white shadow-xs">
                <Text className="text-lg font-bold text-center">Basket</Text> 
                <Text className="text-center text-gray-400">Send Coupon</Text>
            </View>
            <UserSearch onSelectUser={setReceiver} />
            {items?.map((item) => (
                <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5" key={item.id}>
                    <Image source={{ uri: urlFor(item.image.asset._ref).url() }} className="h-20 w-20 bg-gray-300 p-4 rounded-md" />
                    <Text className="flex-1 text-center">{item.message}</Text>
                    <TouchableOpacity onPress={() => changeSingleCoupon(item.id)}>
                        <Text className="text-[#d95da5]">Remove</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>

        <View className="p-5 bg-white mt-5 space-y-4">
            <View className="flex-row justify-between">
                <Text className="text-gray-400">Sending to</Text>
                <Text className="text-gray-400">"Name"</Text>
            </View>
            <View className="flex-row justify-between">
                <Text className="text-gray-400">SubTotal</Text>
                <Text className="text-gray-400">"Hello"</Text>
            </View>
            <View className="flex-row justify-between">
                <Text className="text-gray-400">Promo / Offer Deduction</Text>
                <Text className="text-gray-400">"Hello"</Text>
            </View>
            <View className="flex-row justify-between">
                <Text>Order Total</Text>
                <Text className="font-extrabold">"Hello"</Text>
            </View>
            <TouchableOpacity onPress={handlePlaceOrder} className="rounded-lg bg-[#d95da5] p-4">
                <Text className="text-center text-white text-lg font-bold">Place Order</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
);

}
export default Checkout