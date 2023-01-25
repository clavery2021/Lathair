import { Text, View, SafeAreaView, FlatList, ScrollView, SectionList } from "react-native";
import { useState, useEffect } from "react";
import { COLORS, NFTData } from "../constants";
import FocusedStatusBar from "../components/FocusedStatusBar";
import CouponCard from "../components/CouponCard";

const CouponTemplates = ({ route }) => {
  const { data } = route.params;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
        <FlatList
            data={data.coupon}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
            //Warning: Each child in a list should have a unique "key"
              <CouponCard
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

export default CouponTemplates