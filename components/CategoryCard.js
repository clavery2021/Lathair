import { View, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { urlFor } from '../sanity';
import { COLORS, SIZES, SHADOWS } from "../constants";
import { CouponTitle, SubInfo } from './CouponInfo';

import { RectButton } from './Button';

const CategoryCard = ({ data }) => {
    const navigation = useNavigation();

    return (
        <View style={{
            backgroundColor: COLORS.white,
            borderRadius: SIZES.font,
            marginBottom: SIZES.extraLarge,
            margin: SIZES.base,
            ...SHADOWS.dark
        }}>
            <View style={{ width: "100%", height: 280 }}>
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
                        text="Select Occasion"
                    />
                </View>
            </View>
        </View>
    )
}

export default CategoryCard