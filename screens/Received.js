import { Text, View, SafeAreaView, FlatList, Image, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import sanityClient from "../sanity";
import { COLORS, SIZES } from "../constants";
import { useAuth } from '../contexts/useAuth';
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { urlFor } from '../sanity';
import UseCouponItem from "../components/ReceivedScreen.js/UseCouponItem";

const Received = () => {
  const { user } = useAuth();
  const userId = user?.uid;
  const [receivedCoupons, setReceivedCoupons] = useState([]);
  const [receivedCouponBook, setReceivedCouponBook] = useState([]);
  
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
        headerShown: false,
    });
  }, []);

  //extract calls to utils if possible.

  useEffect(() => {
    if (!userId) return;
      sanityClient.fetch(
        `*[_type == "sendCoupon" && receiver == "Receiver"]
         {...}`
      ).then((data) => {
          setReceivedCoupons(data);
      });
      
    }, [userId]);

    useEffect(() => {
      if (!userId) return;
      sanityClient.fetch(
        `*[_type == "sentCouponBook" && sender == "${userId}"] {...}`
      ).then((data) => {
        setReceivedCouponBook(data);
      });
    }, [userId]);

    const handleCouponUsage = async (coupon) => {
      console.log('Coupon:', coupon);
      const token = "skWcyp2782tUHFJD8YsiRsG55gm2hudj7D93CbJpISumYuldWHOilNBZuTZp4iwd0EbRcCbgNjxjTCMnYswR8FolWRywEqTa3kWZNryQpUcHRflkpcBFh2CCOZ2auT4IGC70bxMaSbYncvhSjwA8Nesk83aQEBq1OfFWdhc4gjBKvAUtJLIk";
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        console.log('Updating coupon:', coupon._id);
        // Update the 'usedCoupon' field to true
        await sanityClient
          .patch(coupon._id)
          .set({ usedCoupon: true })
          .commit(config);
    
        const updatedCoupons = await sanityClient.fetch(
          `*[_type == "sendCoupon" && receiver == "Receiver"] {...}`,
          config
        );
        setReceivedCoupons(updatedCoupons);
    
      } catch (error) {
        console.error('Error updating coupon:', error.response || error.message);
      }
    };
    
return (

  <SafeAreaView className="flex-1 bg-white relative">
  <View className="px-6 mt-6 mb-6 space-y-3 ">
    <Text className="text-[#3C6072] text-[35px]">Received Coupons</Text>
    <Text className="text-[#3C6072] text-base">Cash in your coupons before they expire</Text>
  </View>

  <View className="px-4 py-4">
    <ScrollView horizontal className="relative bg-white shadow-lg">
      {receivedCoupons?.map((coupon) => (
        <UseCouponItem key={coupon._id} coupon={coupon} handleCouponUsage={handleCouponUsage} urlFor={urlFor} />
      ))}
    </ScrollView>
  </View>

  <View className="px-6 mt-2 space-y-3">
    {/* If no books sent show this + animation */}
        {/* <Text className="text-[#3C6072] text-[35px]">Share the love</Text> */}
        <Text className="text-[#3C6072] text-base">
        Books
      </Text>
  </View>
  
  {/* Books need extracted  */}
    <FlatList
      data={receivedCouponBook}
      keyExtractor={(item) => item._id}
      renderItem={({ item: couponBook }) => (
        <View className="px-4 py-4">
          <ScrollView horizontal className="relative bg-white shadow-lg">
            {couponBook.sendCoupon?.map((coupon, index) => (
              <View key={coupon._id}>
                <Image
                  source={{
                    uri: urlFor(coupon?.image?.asset?._ref).url()
                  }}
                  style={{ width: 390, height: 280, marginRight: 10, objectFit: 'cover', borderRadius: 16 }}
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
                      textAlign: 'center',
                      paddingHorizontal: SIZES.base,
                      borderRadius: SIZES.font,
                      overflow: 'hidden'
                    }}>{coupon.message}</Text>
                  </View>
                )}
                <View className="absolute flex-row inset-x-0 bottom-5 justify-between px-6">
                  <View className="flex-row space-x-2 items-center">
                    <Text className="text-[12px] font-bold text-gray-100">
                      {index + 1} / {couponBook.sendCoupon.length}
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
          </ScrollView>
        </View>
      )}
    />

</SafeAreaView>
)}
export default Received;