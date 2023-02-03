import React from 'react'
import { View, SafeAreaView, Text, Image, StatusBar, TouchableOpacity, Button } from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../redux/basketSlice";
import { urlFor } from '../sanity';
import { COLORS, SIZES, SHADOWS } from "../constants";

//dont think I need props
//get data/items from redux state 
const Checkout = () => {

    const basketTotal = useSelector(selectBasketTotal)
    const items = useSelector(selectBasketItems);
    // const items = useSelector(selectBasketItems);
    const dispatch = useDispatch();

    console.log(items)
    // console.log(basketTotal)

    //Create a CouponCheckout Coupon that is smaller
    //Design checkout with Maria 
    
return (
    <SafeAreaView>     
        <View style = {{ flex:-1, backgroundColor: "white"}} >
            <View style = {{ flex:-1, backgroundColor: "gray"}} >
                <View style = {{ padding: 5, border: "bold", borderColor: "red", backgroundColor: "white"}} >
                    <View>
                        <Text style={{ fontSize: "20", fontStyle: "bold", text: "center"}}>Basket</Text> 
                        <Text className="text-center text-gray-400">
                            {/* {restaurant.title} */}
                        </Text>
                    </View>

                    <TouchableOpacity
                        // onPress={navigation.goBack}
                        className="rounded-full bg-gray-100 absolute top-3 right-5"
                        >
                            {/* <XCircleIcon color="#00CCBB" height={50} width={50} /> */}
                        </TouchableOpacity>
                </View> 
            </View>
        
         {/* {items?.map((item, index) => (
            <View key={index}>
                <Text>Coupon Title : {item.title}</Text>
                <View style={{ width: "100%", height: 250 }}>
                    <Image
                    source={{
                        uri: urlFor(item.image.asset._ref).url()
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
          </View>
        ))} */}
        </View>
    </SafeAreaView>

)
}
export default Checkout