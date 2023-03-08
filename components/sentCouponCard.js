import { View, SafeAreaView, Text, Image, StatusBar, TouchableOpacity, Button } from 'react-native'
import { useState } from "react";
import { urlFor } from '../sanity';
import { COLORS, SIZES, SHADOWS } from "../constants";
import { CouponTitle, SubInfo } from './CouponInfo';
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/outline";
import { RectButton } from './Button';
import { useDispatch, useSelector } from "react-redux";
import { singleCoupon } from "../redux/basketSlice";
import { useNavigation } from '@react-navigation/native';

const SentCouponCard = ({ data, title, subTitle }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

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
          onPress={() => setIsPressed(!isPressed)}
          style = {{
            borderColor: "grey"
          }}
        >
        <View style={{ width: "100%", height: 250 }}>
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
        {/* This will be used as expriy date */}
        <SubInfo text={"Expires in"} price={"2 days"}/>
        <View style={{ width: "100%", padding: SIZES.font }}>
          <CouponTitle
            title={title}
            subTitle={subTitle}
            titleSize={SIZES.large}
            subTitleSize={SIZES.small}
          />
        </View>        
      </View>
  )
}

export default SentCouponCard