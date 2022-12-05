import { Text, View, SafeAreaView, FlatList, ScrollView, SectionList } from "react-native";
import { useState } from "react";
import { COLORS, NFTData } from "../constants";
import FocusedStatusBar from "../components/FocusedStatusBar";
import CouponCard from "../components/CouponCard";

const Home = () => {
  const [nftData, setNftData] = useState(NFTData);

  return (
    <SafeAreaView style={{ flex: 1}}>
      <FocusedStatusBar backgroundColor={COLORS.primary} />
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
          <SectionList
            contentContainerStyle={{ paddingHorizontal: 10 }}
            stickySectionHeadersEnabled={false}
            sections={NFTData}
            renderSectionHeader={({ section }) => (
            <>
              <Text>{section.title}</Text>
              <FlatList
                horizontal
                data={section.data}
                renderItem={({ item }) => <CouponCard data={item} />}
                showsHorizontalScrollIndicator={false}
              />
            </>
          )}
            renderItem={() => {
              return null;
            }}
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