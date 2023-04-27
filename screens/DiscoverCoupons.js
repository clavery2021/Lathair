import { View, Text, SafeAreaView, TextInput, TouchableOpacity } from "react-native";
import React, { useLayoutEffect, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import sanityClient, { urlFor } from "../sanity";
import CouponMenuContainer from "../components/CouponContainer.js/CouponContainer";
import CouponItemContainer from "../components/CouponContainer.js/CouponItemContainer";

const DiscoverCoupons = () => {
    const [couponCategories, setCouponCategories] = useState([]);
    const [coupons, setCoupons] = useState([]);
    const navigation = useNavigation()
    const [selectedCategory, setSelectedCategory] = useState();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    // on button click query set(category.occassion)
    // loop over this occasions coupons 
    useEffect(() => {
        sanityClient.fetch(
          `*[_type == "category"]{
            ...,
            coupon[] -> {
              ...,
              couponMessage[] -> 
                {...,}
            },
          }`
        ).then((data) => {
          setCouponCategories(data);
        });
      }, []);

    useEffect(() => {
      if (!selectedCategory) {
        // If no category is selected, fetch coupons for the first category in the collection
        const firstCategory = couponCategories[0]?.title;
        console.log(firstCategory)
        setSelectedCategory(firstCategory);
        sanityClient
          .fetch(
            `*[_type == "coupon" && category->title == "${firstCategory}"] {
              ...,
            }`
          )
          .then((data) => {
            setCoupons(data);
          });
      } else {
        // If a category is selected, fetch coupons for the selected category
        sanityClient
          .fetch(
            `*[_type == "coupon" && category->title == "${selectedCategory}"] {
              ...,
            }`
          )
          .then((data) => {
            setCoupons(data);
          });
      }
    }, [selectedCategory, couponCategories]);
    

      const categorySelection = (title) => {
        setSelectedCategory(title);
      };

return (
    <SafeAreaView className="flex-1 bg-white relative">
        <View className="flex-row items-center justify-between px-8">
            <View>
                <Text className="text-[36px] text-[#d95da5] font-bold mt-4">Discover Coupons</Text>
                <Text className="text-[#527283] text-[20px]">Send the gift of love and time.</Text>
            </View>
{/* 
            Avatar profile image
            <View className="w-12 h-12 bg-gray-400"></View> */}
        </View>

        <View className="flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 shadow-lg mt-4">
            <TextInput
                style={{ height: 40 }}
                // onChangeText={handleMessageChange}
                // value={message}
                placeholder="Coffee Date"
            />
        </View>

          {/* //Something should go between */}
      
        {/* CouponMenuContainer */}
    <ScrollView  style={{ paddingHorizontal: 16 }}>
    {/* <View className="flex-row items-center justify-center px-8 mt-8"> */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row mt-8">
        {couponCategories.map((category) => (
          <CouponMenuContainer
            key={category._id}
            title={category.title}
            imageSrc={{ uri: urlFor(category.image.asset._ref).url() }}
            onPress={() => categorySelection(category.title)}
          />
        ))}
      </ScrollView>
      {/* </View> */}

      <View>

      <View className="px-1 mt-8 flex-row items-center justify-evenly flex-wrap">
        {coupons?.map((coupon) => (
            <CouponItemContainer
            key={coupon._id}
            title={coupon.title}
            imageSrc={{ uri: urlFor(coupon.image.asset._ref).url() }}
            description={coupon.description}
            data={coupon}
            />
        ))}

    </View>

    </View>
    </ScrollView>

  
    </SafeAreaView>
    )
}

export default DiscoverCoupons;