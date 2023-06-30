import { Text, View, SafeAreaView, FlatList, Image, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import sanityClient from "../sanity";
import SentCouponCard from "../components/sentCouponCard";
import { COLORS, SIZES } from "../constants";
import { useAuth } from '../contexts/useAuth';
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { urlFor } from '../sanity';
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const Received = () => {
  const [receivedCoupons, setReceivedCoupons] = useState([]);
  const [receivedCouponBook, setReceivedCouponBook] = useState([]);
  const { user } = useAuth();
  const userId = user?.uid;
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
        headerShown: false,
    });
  }, []);

  //This will eventually be make a call the user table
  //It will then reference coupons by user Id
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

      // This is working. Need to tidy up code
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
      
          console.log('Coupon updated successfully.');
      
          // Optional: Fetch the updated coupon data again
          console.log('Fetching updated coupons...');
          const updatedCoupons = await sanityClient.fetch(
            `*[_type == "sendCoupon" && receiver == "Receiver"] {...}`,
            config
          );
          console.log('Updated coupons:', updatedCoupons);
          setReceivedCoupons(updatedCoupons);
      
          // Perform any additional actions or update state as needed
        } catch (error) {
          // Handle error
          console.error('Error updating coupon:', error.response || error.message);
        }
      };
      
return (
<SafeAreaView className="flex-1 bg-white relative">
  <View className="px-6 mt-6 mb-6 space-y-3 ">
     {/* If no coupons sent show this + animation */}
      {/* <Text className="text-[#3C6072] text-[35px]">Share the love</Text> */}
      <Text className="text-[#3C6072] text-[35px]">Received Coupons</Text>
  
      <Text className="text-[#3C6072] text-base">
        Cash in you coupons before they expire
      </Text>
  </View>

{/* Needs te be extracted to a component */}
<View className="px-4 py-4">
  <ScrollView horizontal className="relative bg-white shadow-lg">
      {receivedCoupons?.map((coupon) => (
            <TouchableOpacity
            key={coupon._id}
            onPress={() => {
              Alert.alert(
                'Use Coupon',
                'Would you like to use this coupon?',
                [
                  {
                    text: 'No',
                    onPress: () => {
                      // Handle 'No' action
                    },
                    style: 'cancel',
                  },
                  {
                    text: 'Yes',
                    onPress: () => {
                      handleCouponUsage(coupon)
                    },
                  },
                ],
                { cancelable: true }
              );
            }}
          >
        {/* //Need message for it has been used */}
        <View key={coupon._id}
        style={{
          opacity: coupon.usedCoupon ? 0.5 : 1, // Grey out if usedCoupon is true
        }}>
          <Image
            source={{
              uri: urlFor(coupon?.image?.asset?._ref).url()
            }}
            // className="w-200 h-200 object-cover rounded-2xl"
            //Need to ensure this fits all screens
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
                            // font: fontStyle,
                            textAlign: 'center',
                            paddingHorizontal: SIZES.base,
                            borderRadius: SIZES.font,
                            overflow: 'hidden'
                        }}>{coupon.message}</Text>
                    </View>
                    )}
                    {/* Maybe have arrows so ppl know they have more coupons */}
                    <View className="absolute flex-row inset-x-0 bottom-5 justify-between px-6">
                        <View className="flex-row space-x-2 items-center">
                            <Text className="text-[12px] font-bold text-gray-100">
                                {coupon.sender}
                            </Text>
                        </View>

                        <View className="px-2 py-1 rounded-md bg-[#d95da5]">
                            <Text className="text-gray-100">
                                15 days To Go 
                            </Text>
                        </View>
                    </View>
                </View>
              </TouchableOpacity>
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