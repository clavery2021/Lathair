import { Text, View, SafeAreaView, FlatList } from "react-native";
import { useState, useEffect, useContext } from "react";
import sanityClient from "../sanity";
import SentCouponCard from "../components/sentCouponCard";
import { COLORS } from "../constants";
import AuthContext from "../contexts/Auth";

const Sent = () => {
    const [sentCoupons, setSentCoupons] = useState([]);
    const { userId } = useContext(AuthContext);
   
    useEffect(() => {
        sanityClient.fetch(
        `*[_type == "sentCouponTest1" && sender == $userId] {...}`,
            { userId }
        ).then((data) => {
            setSentCoupons(data);
        });
        
      }, []);

      console.log(sentCoupons)
    return (
        <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ zIndex: 0 }}>
          <FlatList
              data={sentCoupons}
              keyExtractor={(item) => item.id}
              horizontal
              renderItem={({ item }) =>
                <SentCouponCard
                  key={item.id}
                  data={item}
                  title={`Coupon Sent To: ${item.receiver}`}
                //   subTitle={`Click this coupon to use it.\nWhy not send ${item.sender} a coupon back?`}
                />
              }
          />
            {/* This list will be for used coupon books */}
              <FlatList
              data={sentCoupons}
              keyExtractor={(item) => item.id}
              horizontal
              renderItem={({ item }) =>
                <SentCouponCard
                  key={item.id}
                  data={item}
                  title={`Coupon Sent To: ${item.receiver}`}
                //   subTitle={`Click this coupon to use it. \nWhy not send ${item.sender} a coupon back?`}
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

export default Sent;