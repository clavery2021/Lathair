import { View, Text, Image, StatusBar } from 'react-native'
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
      marginBottom: SIZES.extraLarge,
      margin: SIZES.base,
      ...SHADOWS.dark
    }}>
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
      <SubInfo />
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
            handlePress={() => navigation.navigate("CouponTempDetails", { data })}
            // text={`Select this `{data.title} `template`}
            text="Select this template"
          />
        </View>
      </View>
    </View>
  )
}

export default CouponCard