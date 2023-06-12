import { Text, View, SafeAreaView, FlatList, Image, TouchableOpacity } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import sanityClient from "../sanity";
import SentCouponCard from "../components/sentCouponCard";
import { COLORS, SIZES } from "../constants";
import { useAuth } from '../contexts/useAuth';
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { urlFor } from '../sanity';
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

const Sent = () => {
  const [sentCoupons, setSentCoupons] = useState([]);
  const [sentCouponBook, setSentCouponBook] = useState([]);
  const [couponInBook, setCouponInBook] = useState([]);
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
          `*[_type == "sendCoupon" && sender == "${userId}"]
           {...}`
        ).then((data) => {
            setSentCoupons(data);

        });
        
      }, [userId]);

      useEffect(() => {
        if (!userId) return;
        sanityClient.fetch(
          `*[_type == "sentCouponBook" && sender == "${userId}"] {...}`
        ).then((data) => {
          setSentCouponBook(data);
          const sendCoupons = data.flatMap((book) => book.sendCoupon);
          setCouponInBook(sendCoupons);
        });
      
      }, [userId]);

return (
<SafeAreaView className="flex-1 bg-white">
  <View className="px-6 mt-6 space-y-3">
     {/* If no coupons sent show this + animation */}
      {/* <Text className="text-[#3C6072] text-[35px]">Share the love</Text> */}
      <Text className="text-[#3C6072] text-[35px]">Sent Coupons</Text>
  
      <Text className="text-[#3C6072] text-base">
        Check if your loved ones have cashed in their coupons
      </Text>
  </View>

{/* Needs te be extracted to a component */}
<View className="px-4 py-4">
  <ScrollView horizontal className="relative bg-white shadow-lg">
      {sentCoupons?.map((coupon) => (
        
        <View key={coupon._id}>
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
                                Hello
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
  <View className="px-6 mt-2 space-y-3">
    {/* If no books sent show this + animation */}
        {/* <Text className="text-[#3C6072] text-[35px]">Share the love</Text> */}
        <Text className="text-[#3C6072] text-base">
        Books
      </Text>
  </View>
  
    <FlatList
      data={sentCouponBook}
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
export default Sent;