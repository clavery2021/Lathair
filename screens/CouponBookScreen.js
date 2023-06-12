import { useState, useEffect, useContext } from "react";
import { View, SafeAreaView, Text, Image, StatusBar, TouchableOpacity, Button, ScrollView } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { removeCoupon, selectCouponBookItems, clearCouponBook } from '../redux/couponBookSlice';
import { urlFor } from '../sanity';
import { COLORS, SIZES } from "../constants";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';
import { useAuth } from '../contexts/useAuth';
import sanityClient from "../sanity";

const CouponBookScreen = () => {

    // Could make this screen look more like the checkout

    const items = useSelector(selectCouponBookItems);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [receiver, setReceiver] = useState(null);
    const newId = uuid.v4();
    const { user } = useAuth();
    const userId = user?.uid;

    const removeCouponFromBook = (couponIndex) => {
        dispatch(removeCoupon(couponIndex));
    };

    const newCouponBook = {
        _type: 'sentCouponBook',
        id: newId,
        //image: Cover photo,
        //coverMessage: Happy new year from Cormac ....
        //dates
        sender: userId,
        receiver: "Receiver",
    
        //resolve issue 
        sendCoupon: 
            items?.map((coupon, index) => ({
                _key: `${newId}_${index}`,
                _type: 'sendCoupon',
                id: `${newId}_${index}`,
                image: coupon.image,
                message: coupon.message
              })),
      };


    const handlePlaceOrder = async () => {
        // if (couponDetails.receiver) {
        //     //This needs extracted
             const token = "skWcyp2782tUHFJD8YsiRsG55gm2hudj7D93CbJpISumYuldWHOilNBZuTZp4iwd0EbRcCbgNjxjTCMnYswR8FolWRywEqTa3kWZNryQpUcHRflkpcBFh2CCOZ2auT4IGC70bxMaSbYncvhSjwA8Nesk83aQEBq1OfFWdhc4gjBKvAUtJLIk";
            const config = {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${token}`
              }
            };
            console.log(newCouponBook);
            sanityClient.create(newCouponBook, config)
              .then(res => {
                dispatch(clearCouponBook());
                console.log(`Coupon Book Sent with id : ${newId}`);
              })
              .catch(err => {
                console.error('Error sending Coupon Book', err);
              });
            navigation.navigate("PreparingOrder");
        //   } else {
        //     alert("A receiver must be selected before placing an order.");
        //   }
      }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-4 py-4">
                <ScrollView horizontal className="relative bg-white shadow-lg">
                    {items?.map((coupon, index) => (
                        <View key={coupon._id}>
                            <Image
                                source={{
                                    uri: urlFor(coupon?.image?.asset?._ref).url()
                                }}
                                // className="w-200 h-200 object-cover rounded-2xl"
                                //Need to ensure this fits all screens
                                style={{ width: 390, height: 300, marginRight: 10, objectFit: 'cover', borderRadius: 16 }}

                            />
                            {coupon?.message !== '' && (
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
                                        // font: fontStyle,
                                        textAlign: 'center',
                                        paddingHorizontal: SIZES.base,
                                        borderRadius: SIZES.font,
                                        overflow: 'hidden'
                                    }}>{coupon.message}</Text>
                                </View>
                            )}

                            <View className="absolute flex-row inset-x-0 top-5 justify-between px-6">
                                <TouchableOpacity
                                    // Should go back to the screen the user was on
                                    onPress={() => navigation.navigate("Landing")}
                                    className="w-10 h-10 rounded-md items-center justify-center bg-white"
                                >
                                    <FontAwesome5 name="chevron-left" size={24} color="#d95da5" />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => removeCouponFromBook(index)}>
                                    <FontAwesome5 name="trash" size={24} color="#fff" />
                                </TouchableOpacity>
                            </View>

                            {/* Maybe have arrows so ppl know they have more coupons */}
                            <View className="absolute flex-row inset-x-0 bottom-5 justify-between px-6">
                                <View className="flex-row space-x-2 items-center">
                                    <Text className="text-[12px] font-bold text-gray-100">
                                        {index + 1}  / {items.length}
                                    </Text>
                                </View>

                                <View className="px-2 py-1 rounded-md bg-[#d95da5]">
                                    <Text className="text-gray-100">
                                        15 days To Go
                                    </Text>
                                </View>
                            </View>
                        </View>
                    ))}

                    {/* Remove all
      Used coupon banner
      Cover page Selection
      Select contact to send to */}
                </ScrollView>

            </View>
            <TouchableOpacity onPress={handlePlaceOrder}  className="mt-4 px-3 py-3 rounded-lg bg-[#d95da5] items-center justify-center mb-12">
                <Text className="text-1xl font-semibold uppercase tracking-wider text-gray-100">
                    Send
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default CouponBookScreen;