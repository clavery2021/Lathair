import { View, Text, SafeAreaView, Image, TouchableOpacity, TextInput, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { urlFor } from '../sanity';
import { FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import { COLORS, SIZES } from "../constants";
import { FontSelection } from "../components/Font/FontSelection";
import Carousel, { Pagination } from 'react-native-snap-carousel-v4';

const CouponScreen = ({ route } ) => {
    const navigation = useNavigation();
    const { data } = route?.params;
    const [message, setMessage] = useState('');

    const [fontStyle, setFontStyle] = useState('normal');
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

                <View className="mt-6">
                    <Text className="text-[#d95da5] text-[24px] font-bold">
                        {data?.title}
                    </Text>
                    <View className="flex-row items-center space-x-2 mt-2">
                        <FontAwesome name="gift" size={25} color="#8C9EA6" />
                        <Text className="text-[#8C9EA6] text-[20px] font-bold">
                            Valentines Day
                        </Text>
                    </View>
                </View>

                <View className="mt-4 flex-row items-center justify-between ml-4 mr-8">
                        <View className=" flex-row items-center space-x-2">
                        <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                            <FontAwesome name="star" size={24} color="#D58574" />
                        </View>
                        <View>
                            <Text className="text-[#515151]">
                                {/* {data?.rating} */}
                                </Text>
                            <Text className="text-[#515151]">Coupon Ratings</Text>
                        </View>
                        </View>
    
                        <View className=" flex-row items-center space-x-4">
                        <View className="w-12 h-12 rounded-2xl bg-red-100 items-center justify-center shadow-md">
                            <MaterialIcons name="attach-money" size={24} color="#D58574" />
                        </View>
                        <View>
                            <Text className="text-[#515151]">
                                {/* {data?.price_level} */}
                                Free
                                </Text>
                            <Text className="text-[#515151]">Price Level</Text>
                        </View>
                        </View>
                
                </View>

                <Text className="mt-4 tracking-wide text-[16px] font-semibold text-[#97A6AF]">
                    {/* {data?.description} */}
                    Hit send coupon by selecting "Send Coupon" or select the heart to add to a book 
                </Text>
                <View style={{ marginTop: 20 }}>
                    <Carousel
                        data={hints}
                        renderItem={renderHintItem}
                        sliderWidth={300}
                        itemWidth={200}
                        onSnapToItem={(index) => setActiveSlide(index)}
                    />
                    {renderPagination()}
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
                    <View className="mt-4 px-3 py-3 rounded-lg bg-[#d95da5] items-center justify-center mb-12">
                        <Text className="text-1xl font-semibold uppercase tracking-wider text-gray-100">
                        Send Coupon
                        </Text>
                    </View>
        
            </ScrollView>
        </SafeAreaView>
    );
};

export default CouponScreen;