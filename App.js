import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from 'expo-font';
import React, { useEffect, useState } from "react";
import Coupons from "./screens/Coupons";
import CouponTemplates from "./screens/CouponTemplates";
import Home from "./screens/Home";
import { Provider } from "react-redux";
import { store } from "./store";
import Checkout from "./screens/Checkout";
import SignIn from "./screens/SignIn";
import PreparingOrderScreen from "./screens/PreparingOrderScreen";
import Landing from "./screens/Landing";
import { useAuth } from "./contexts/useAuth";
import CouponScreen from "./screens/CouponScreen";

const Stack = createNativeStackNavigator();

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "transparent"
  }
}

const App = () => {
  const [loaded] = useFonts({ 
    InterBold: require("./assets/fonts/Inter-Bold.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
  });

  const { user } = useAuth();

  if(!loaded) return null;

  return (
    <NavigationContainer theme={theme}>
            <Provider store={store}>
              <Stack.Navigator 
                screenOptions={{ headerShown: false }}
                initialRouteName="Landing">
               {/* {user ? (
                    <Stack.Screen name="SignIn" component={SignIn} />
                   ) : (   */}
                    <>
                      <Stack.Screen name="Landing" component={Landing}/>
                      <Stack.Screen 
                        name="CouponTemplates" 
                        component={CouponTemplates}
                        options={{
                          title: 'Coupon Templates',
                          headerTitleAlign: 'center',
                        }}
                        />
                      <Stack.Screen name="CouponScreen" component={CouponScreen}/>
                      {/* <Stack.Screen name="Checkout" component={Checkout}/> */}
                      {/* Add something similar for transitioning from login */}
                      <Stack.Screen name="PreparingOrder" component={PreparingOrderScreen}/>
                  </>
                {/* )}  */}
              </Stack.Navigator>
            </Provider>    
    </NavigationContainer>
  );
}

export default App;