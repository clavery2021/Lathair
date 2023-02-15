import { Text, View, SafeAreaView, FlatList, ScrollView, SectionList } from "react-native";

import MessageCouponCard from "../components/MessageCouponCard";
import { COLORS } from "../constants";
import { urlFor } from '../sanity';

const Coupons = ({ route } ) => {
    //for testing 
    const { data } = route.params;
    //Need x6 or so coupons of the same template
    //Which includes a msg
    //Custmo msg in the voucher

    return (
      <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View style={{ zIndex: 0 }}>
        <FlatList
            data={data.couponMessage}
            keyExtractor={(item) => item.id}
            // numColumns={2}
            renderItem={({ item }) =>
              <MessageCouponCard
                key={item.id}
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

export default Coupons