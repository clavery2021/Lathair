import { View, SafeAreaView, Text, Image, StatusBar, TouchableOpacity } from 'react-native'
import { useState } from "react";
import { urlFor } from '../sanity';
import { COLORS, SIZES, SHADOWS } from "../constants";
import { CouponTitle, SubInfo } from './CouponInfo';

const MessageCouponCard = ({ data }) => {
  const [isPressed, setIsPressed] = useState(false);

  console.log(isPressed)
  return (

  
    <View style={{
      // width: "45%",
      // height: "45%",
      backgroundColor: COLORS.white,
      borderRadius: SIZES.font,
      marginBottom: SIZES.extraLarge,
      marginLeft: SIZES.base,
      marginRight: SIZES.base,
      ...SHADOWS.dark,
    }}>
        <TouchableOpacity 
    style = {{
      borderColor: "grey"
    }}
    >
        <View style={{ width: "100%", height: 250 }}>
          {/* <CircleButton imgUrl={assets.heart} right={10} top={10} /> */}
          <Image
            source={{
              uri: urlFor(data.image.asset._ref).url()
            }}
            resizeMode="cover"
            style={{
              width: "100%",
              height: "100%",
              borderTopLeftRadius: SIZES.font,
              borderTopRightRadius: SIZES.font,
            }}
          />
        </View>
        </TouchableOpacity>

        <SubInfo />
        <View style={{ width: "100%", padding: SIZES.font }}>
          <CouponTitle
            title={data.title}
            subTitle={"Select Image to add this coupon to your coupon book"}
            titleSize={SIZES.large}
            subTitleSize={SIZES.small}
          />
          <View style={{
            marginTop: SIZES.font,
            alignItems: "center",
          }}>

          </View>
        </View>
      </View>

  )
}

export default MessageCouponCard