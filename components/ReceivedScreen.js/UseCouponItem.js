import React from 'react';
import { View, TouchableOpacity, Image, Text, Alert } from 'react-native';
import { COLORS, SIZES } from "../../constants"

const UseCouponItem = ({ coupon, handleCouponUsage, urlFor }) => {
  const onPressCoupon = () => {
    if (coupon.usedCoupon) {
      // Display another pop-up message for used coupon
      Alert.alert(
        'Coupon Used',
        `This coupon has already been used: "${coupon.message}".`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Handle 'OK' action if needed
            },
          },
        ],
        { cancelable: true }
      );
    } else {
      // Display the use coupon confirmation pop-up
      Alert.alert(
        'Use Coupon',
        'Would you like to use this coupon?',
        [
          {
            text: 'No',
            onPress: () => {
              // Handle 'No' action
            },
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              handleCouponUsage(coupon);
            },
          },
        ],
        { cancelable: true }
      );
    }
  };

  return (
    <TouchableOpacity key={coupon._id} onPress={onPressCoupon}>
      <View
        key={coupon._id}
        style={{
          opacity: coupon.usedCoupon ? 0.5 : 1,
        }}
      >
        <Image
          source={{
            uri: urlFor(coupon?.image?.asset?._ref).url(),
          }}
          style={{ width: 390, height: 280, marginRight: 10, objectFit: 'cover', borderRadius: 16 }}
        />
        {coupon?.message !== '' && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {!coupon.usedCoupon && (
              <Text
                style={{
                  fontSize: SIZES.extraLarge,
                  color: COLORS.white,
                  textAlign: 'center',
                  paddingHorizontal: SIZES.base,
                  borderRadius: SIZES.font,
                  overflow: 'hidden',
                }}
              >
                {coupon.message}
              </Text>
            )}
            {coupon.usedCoupon && (
              <Text
                style={{
                  fontSize: SIZES.usedCoupon,
                  color: COLORS.white,
                  textAlign: 'center',
                  paddingHorizontal: SIZES.usedCouponBanner,
                  borderRadius: SIZES.font,
                  overflow: 'hidden',
                }}
              >
                Used
              </Text>
            )}
          </View>
        )}
        <View
          style={{
            position: 'absolute',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            bottom: 5,
            left: 6,
            right: 6,
          }}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              {coupon.sender}
            </Text>
          </View>

          <View className="px-2 py-1 rounded-md bg-[#d95da5] mr-5">
            <Text className="text-gray-100">
              15 days To Go
            </Text>
          </View>

        </View>
      </View>

    </TouchableOpacity>
  );
};

export default UseCouponItem;
