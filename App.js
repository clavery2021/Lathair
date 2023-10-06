import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from 'expo-font';
import { Provider } from "react-redux";
import { store } from "./store";
import SignIn from "./screens/SignIn";
import PreparingOrderScreen from "./screens/PreparingOrderScreen";
import Landing from "./screens/Landing";
import { useAuth } from "./contexts/useAuth";
import CouponScreen from "./screens/CouponScreen";
import CouponBookScreen from "./screens/CouponBookScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";

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
    // <GestureHandlerRootView>
    <NavigationContainer theme={theme}>
      <Provider store={store}>
        {!user ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Sign In" component={SignIn} />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Landing">
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="CouponScreen" component={CouponScreen} />
            <Stack.Screen name="CouponBookScreen" component={CouponBookScreen} />
                        {/* <Stack.Screen name="Checkout" component={Checkout} /> */}
            {/* Add something similar for transitioning from login */}
            <Stack.Screen name="PreparingOrder" component={PreparingOrderScreen} />
          </Stack.Navigator>
        )}
      </Provider>
    </NavigationContainer>
  // </GestureHandlerRootView>
  );

}


export default App;