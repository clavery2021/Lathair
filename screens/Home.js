import { Text, View, SafeAreaView, FlatList, ScrollView, SectionList } from "react-native";
import { useState, useEffect } from "react";
import { COLORS, NFTData } from "../constants";
import FocusedStatusBar from "../components/FocusedStatusBar";
import sanityClient from "../sanity";
import CategoryCard from "../components/CategoryCard";

const Home = () => {
  const [couponCategories, setCouponCategories] = useState([]);

  useEffect(() => {
    sanityClient.fetch(
      `*[_type == "category"]{
        ...,
        coupon[] -> {
          ...
        }
      }`
    ).then((data) => {
      setCouponCategories(data);
    });

  }, []);

  return (
    <SafeAreaView style={{ flex: 1}}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <FlatList
            data={couponCategories}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => 
            // May need to create a category card instead for the homepage
              <CategoryCard
                data={item}
              />  
            }
          />
        </View>
        <View style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            zIndex: -1,
          }}>
          <View style={{ height: 300, backgroundColor: COLORS.primary }} />
          <View style={{ flex: 1, backgroundColor: COLORS.white }} />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Home