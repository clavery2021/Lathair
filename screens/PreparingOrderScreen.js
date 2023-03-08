import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress"

const PreparingOrderScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
      setTimeout(() => {
        navigation.navigate("Home");
      }, 4000);
    }, []);
    
    return (
        <SafeAreaView className="bg-[#d95da5] flex-1 justify-center items-center">
        <Animatable.Image
          source={require("../assets/FunCoupon.gif")}
          animation="slideInUp"
          iterationCount={1}
          className="h-80 w-96"
        />
        <Animatable.Text
          animation="slideInUp"
          iterationCount={1}
          className="text-lg my-10 text-white font-bold text-center"
        >
          Coupon has been sent to ...
        </Animatable.Text>
        <Progress.Circle size={60} indeterminate={true} color="white" />
      </SafeAreaView>
    )
}

export default PreparingOrderScreen;