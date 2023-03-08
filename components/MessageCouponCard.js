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

const MessageCouponCard = ({ data }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  //create object to send to checkout
  const id = data._id;
  const title = data.title;
  const image = data.image;

  const sendFreeCouponButton = () => {
    dispatch(singleCoupon({ id, title, image }))
    navigation.navigate("Checkout")
    console.log(image)
}

// const addItemToBasket = () => {
//   dispatch(addToBasket({ id, name, description, price, image }))
// }

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

        <SubInfo text={"Only"} price={"£0.99"}/>
        <View style={{ width: "100%", padding: SIZES.font }}>
          <CouponTitle
            title={data.title}
            subTitle={"Select Image to add this coupon to your coupon book"}
            titleSize={SIZES.large}
            subTitleSize={SIZES.small}
          />
         

        </View>        
          {isPressed && (
            <View style={{ 
              width: "100%", 
              padding: SIZES.font, 
              marginBottom: SIZES.large,
             }}>

              {/* if free version only show this - if free show both? */}
              <CouponTitle
                title={"Add this coupon to book"}
                titleSize={SIZES.medium}
              />
                <View 
                style={{
                  width: "100%", 
                  padding: SIZES.font,
                  flexDirection: "row"
                }}>
                  {isAdded && (
                  <TouchableOpacity 
                      // disabled={!items.length}
                      // onPress={removeItemFromBasket}
                  >
                    <MinusCircleIcon 
                      style = {{
                      color: COLORS.primary,
                      size: 40,
                      }}
                    />
                  </TouchableOpacity>
                  )}
                  <TouchableOpacity 
                  // onPress={addItemToBasket}
                  onPress={() => setIsAdded(!isAdded)}
                  >
                    <PlusCircleIcon 
                      style = {{
                        color: COLORS.primary,
                        size: 40,
                        }}
                    />
                  </TouchableOpacity>
                  {/* Need to aline these side by side */}
                  <RectButton
                    minWidth={60}
                    maxWidth={120}
                    // marginLeft={}
                    fontSize={SIZES.font}
                    handlePress={sendFreeCouponButton}
                    
                    //straight to checkout with that item added
          
                    text="Send Free Voucher"></RectButton>
              </View>          
            </View>
          )}
      </View>
  )
}

export default MessageCouponCard