import { View, Text, Image, StatusBar, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { urlFor } from '../sanity';
import { COLORS, SIZES, SHADOWS } from "../constants";
import { CouponTitle, SubInfo } from './CouponInfo';

import { RectButton } from './Button';

const CouponCard = ({ data }) => {
  const navigation = useNavigation();

  return (
    <View style={{
      backgroundColor: COLORS.white,
      borderRadius: SIZES.font,
      // marginBottom: SIZES.extraLarge,
      // margin: SIZES.base,
      ...SHADOWS.dark,
      width: "50%",
    }}>
      <TouchableOpacity onPress={() => navigation.navigate("CouponScreen", { data })}>
        <Image
          source={{
            uri: urlFor(data.image.asset._ref).url()
          }}
          resizeMode="cover"
          style={{
            width: "100%",
            // height: "100%",
            aspectRatio: 1,
            borderRadius: SIZES.font,
          }}
        />
      </TouchableOpacity>
      {/* <SubInfo text={"Only"} price={"£0.99"}/>
      <View style={{ width: "100%", padding: SIZES.font }}>
        <CouponTitle
          title={data.title}
          subTitle={data.description}
          titleSize={SIZES.large}
          subTitleSize={SIZES.small}
        />
        <View style={{
          marginTop: SIZES.font,
          alignItems: "center",
        }}>
          <RectButton
            minWidth={120}
            fontSize={SIZES.font}
            handlePress={() => navigation.navigate("Coupons", { data })}
            // text={`Select this `{data.title} `template`}
            text="Select this template"
          />
        </View>
      </View> */}
    </View>
  )
}

export default CouponCard