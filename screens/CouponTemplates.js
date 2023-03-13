import { View, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { COLORS } from "../constants";
import CouponCard from "../components/CouponCard";
import { useState } from "react";

const CouponTemplates = ({ route }) => {
  const { data } = route.params;
  const [isPressed, setIsPressed] = useState(false);

  return (
    // <SafeAreaView style={{ flex: 1 }}>
    //   <View style={{ flex: 1 }}>
    //     <View style={{ zIndex: 0 }}>
    //     <FlatList
    //         data={data.coupon}
    //         keyExtractor={(item) => item.id}
    //         renderItem={({ item }) =>        
    //           <CouponCard
    //             key={item.id}
    //             data={item}
    //           />
    //         }
    //     />
    //     </View>
    //     <View style={{
    //       position: 'absolute',
    //       top: 0,
    //       bottom: 0,
    //       right: 0,
    //       left: 0,
    //       zIndex: -1,
    //     }}>
    //       <View style={{ height: 300, backgroundColor: COLORS.primary }} />
    //       <View style={{ flex: 1, backgroundColor: COLORS.white }} />
    //     </View>
    //   </View>
    // </SafeAreaView>
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={data.coupon}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>        
          <CouponCard
            key={item.id}
            data={item}
          />
        }
        numColumns={2}
    />
  </SafeAreaView>
  )
}

export default CouponTemplates