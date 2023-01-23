import { View, Text, Image, StatusBar} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { urlFor } from '../sanity';
import { COLORS, SIZES, SHADOWS, assets } from "../constants";
import { CouponTitle, SubInfo } from './CouponInfo';

import { CircleButton, RectButton } from './Button';
// import { SubInfo, EthPrice, NFTTitle  } from './SubInfo';


const CouponCard = ({ data } ) => {
    const navigation = useNavigation();

  return (

    <View style={{
        backgroundColor: COLORS.white,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark
    }}>
        {/* Width at 100% was not working for section list 350 is working on an iphone 14 
        but may not work for other devices */}
        <View style={{ width: 375, height: 250 }}>
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
          subTitle={data.creator}
          titleSize={SIZES.large}
          subTitleSize={SIZES.small}
        />
         <View style={{
           marginTop: SIZES.font,
           flexDirection: "row",
           justifyContent: "space-between",
           alignItems: "center",
         }}>
          <RectButton 
            minWidth={120}
            fontSize={SIZES.font}
            // handlePress={() => navigation.navigate("CouponTempDetails", { data }) }
            />
         </View>
      </View>
    </View>
  )
}

export default CouponCard