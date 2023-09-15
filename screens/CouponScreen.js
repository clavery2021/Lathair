import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCoupon, selectCouponBookItems } from "../redux/couponBookSlice";
import { FontSelection } from "../components/Font/FontSelection";
import Carousel, { Pagination } from 'react-native-snap-carousel-v4';
import CouponRatings from "../components/CouponScreen/CouponRatings";
import { urlFor } from '../sanity';
import { COLORS, SIZES } from "../constants";
import { SendCouponContatiner } from "../components/CouponScreen/SendCouponContainer";
import CouponHintCarousel from "../components/CouponScreen/CouponHintCarousel";
import HandleCouponMessage from "../components/CouponScreen/HandleCouponMessage";
import CouponDescription from "../components/CouponScreen/CouponDescription";
import { addToCouponBookButtonUtils, navigateToCouponBookScreen, sendFreeCouponButtonUtils } from "./utils/couponScreenUtils";

const CouponScreen = ({ route, category }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { data } = route?.params;
  const [message, setMessage] = useState('');

  console.log(category);

  const id = data._id;
  const title = data.title;
  const image = data.image;
  const categoryTitle = data.category.title;
  
  console.log(data.category.title);

  const couponBookItems = useSelector(selectCouponBookItems);
  const numItemsInCouponBook = couponBookItems ? couponBookItems.length : 0;

  const [fontStyle, setFontStyle] = useState('normal');

  const sendFreeCouponButton = () => {
    sendFreeCouponButtonUtils({ dispatch, message, id, title, image, categoryTitle, navigation });
  };

  const addToCouponBookButton = () => {
    addToCouponBookButtonUtils({ dispatch, message, id, title, image, numItemsInCouponBook, setMessage });
  };

  const handleMessageChange = (text) => {
    setMessage(text);
  }

  const handleFontStyleChange = (style) => {
    setFontStyle(style);
  }

  const fontStyles = [
    { label: 'Normal', value: 'normal' },
    { label: 'Italic', value: 'italic' },
    { label: 'Bold', value: 'bold' },
    { label: 'Underline', value: 'underline' },
  ];

  // Define the list of hints for the carousel
  //Need to make schema : Text, occasion ...
  const hints = [
    'Coffee date',
    'Dinner date',
    'Cinema date',
    'Adventure',
    "I will wash your car"
  ];

  // Define a state to keep track of the active slide index
  const [activeSlide, setActiveSlide] = useState(0);

  // Define a function to render each hint item in the carousel
  const renderHintItem = ({ item }) => (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>{item}</Text>
    </View>
  );

  // Define a function to render the pagination dots
  const renderPagination = () => (
    <Pagination
      dotsLength={hints.length}
      activeDotIndex={activeSlide}
      containerStyle={{ paddingVertical: 10 }}
      dotStyle={{
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 8,
        backgroundColor: '#d95da5'
      }}
      inactiveDotStyle={{
        backgroundColor: '#e5e5e5'
      }}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-white relative">
      <ScrollView className="flex-1 px-4 py-6">
        <View className="relative bg-white shadow-lg">
          <Image
            source={{
              uri: urlFor(data?.image?.asset?._ref).url(),
            }}
            className="w-full h-72 object-cover rounded-2xl"
          />
          {message !== '' && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontSize: SIZES.extraLarge,
                  color: COLORS.white,
                  font: fontStyle,
                  textAlign: 'center',
                  paddingHorizontal: SIZES.base,
                  borderRadius: SIZES.font,
                  overflow: 'hidden',
                }}
              >
                {message}
              </Text>
            </View>
          )}
          <View className="absolute flex-row inset-x-0 top-5 justify-between px-6">
            <TouchableOpacity
              onPress={() => navigation.navigate('Landing')}
              className="w-10 h-10 rounded-md items-center justify-center bg-white"
            >
              <FontAwesome5 name="chevron-left" size={24} color="#d95da5" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigateToCouponBookScreen({ numItemsInCouponBook, navigation } )}
              className="w-10 h-10 rounded-md items-center justify-center"
            >
              <FontAwesome5 name="book" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View className="absolute flex-row inset-x-0 bottom-5 justify-between px-6">
            <View className="flex-row space-x-2 items-center">
              {/* BG colour for these items would depend on image colour */}
              <Text className="font-bold text-gray-100">£{data?.price}</Text>
            </View>

            <View className="px-2 py-1 rounded-md">
              <Text className="text-gray-100 font-bold">15 days To Go</Text>
            </View>
          </View>
        </View>

        <CouponDescription data={data} />
        
        <CouponRatings rating={data?.rating} priceLevel={data?.price_level} />

        <Text className="mt-4 tracking-wide text-[16px] font-semibold text-[#97A6AF]">
          {/* {data?.description} */}
          Hit send coupon by selecting "Send Coupon" or select the heart to add to a book
        </Text>

        <HandleCouponMessage message={message} handleMessageChange={handleMessageChange}/>

        <CouponHintCarousel
          hints={hints}
          renderHintItem={renderHintItem}
          setActiveSlide={setActiveSlide}
          renderPagination={renderPagination}
        />

        <FontSelection fontStyles={fontStyles} selectedFontStyle={fontStyle} onFontStyleChange={handleFontStyleChange} />
        <SendCouponContatiner
          sendFreeCouponButton={sendFreeCouponButton}
          addToCouponBookButton={addToCouponBookButton}
         />

      </ScrollView>
    </SafeAreaView>
  );
};

export default CouponScreen;