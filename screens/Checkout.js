import { useState, useEffect, useContext } from "react";
import { View, SafeAreaView, Text, Image, StatusBar, TouchableOpacity, Button } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal, removeFromBasket } from "../redux/basketSlice";
import { urlFor } from '../sanity';
import { XCircleIcon } from "react-native-heroicons/outline";
import { useNavigation } from '@react-navigation/native';
import AuthContext from "../contexts/Auth";
import UserSearch from "../components/UserSearch";
import sanityClient from "../sanity";
import uuid from 'react-native-uuid';

const Checkout = () => {
    const basketTotal = useSelector(selectBasketTotal)
    const items = useSelector(selectBasketItems);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { userId } = useContext(AuthContext);
    const [receiver, setReceiver] = useState(null);
    const newId = uuid.v4();

    const [couponDetails, setCouponDetails] = useState({
        id: "",
        sender: "",
        receiver: "",
        image : "",
    })

      useEffect(() => {
        if (receiver) {
          setCouponDetails({
            id: newId,
            sender: userId,
            receiver: receiver.id,
            image: items[0].image,
          });
        }
      }, [userId, receiver, items]);

    const newCoupon = {
        _type: 'sentCouponTest1',
        id: couponDetails.id,
        sender: couponDetails.sender,
        receiver: couponDetails.receiver,
        image: couponDetails.image,
    }

    const handlePlaceOrder = async () => {
        if (couponDetails.receiver) {
            //This needs extracted
            const token = "skWcyp2782tUHFJD8YsiRsG55gm2hudj7D93CbJpISumYuldWHOilNBZuTZp4iwd0EbRcCbgNjxjTCMnYswR8FolWRywEqTa3kWZNryQpUcHRflkpcBFh2CCOZ2auT4IGC70bxMaSbYncvhSjwA8Nesk83aQEBq1OfFWdhc4gjBKvAUtJLIk";
            const config = {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`
              }
            };
            
            sanityClient.create(newCoupon, config)
              .then(res => {
                console.log(`Coupon Sent with id : ${newId}`);
              })
              .catch(err => {
                console.error('Error sending Coupon', err);
              });
        
            console.log(couponDetails);
            navigation.navigate("PreparingOrder");
          } else {
            alert("A receiver must be selected before placing an order.");
          }
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
            <View>
            <UserSearch onSelectUser={setReceiver} />
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
                    onPress={handlePlaceOrder}
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