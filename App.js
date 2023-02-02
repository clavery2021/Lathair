import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from 'expo-font';
import Coupons from "./screens/Coupons";
import CouponTemplates from "./screens/CouponTemplates";
import Home from "./screens/Home";
import { Provider } from "react-redux";
import { store } from "./store";
import Checkout from "./screens/Checkout";

const Stack = createNativeStackNavigator();

const theme = {
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

  if(!loaded) return null;

  return (
    <NavigationContainer theme={theme}>
      <Provider store={store}>
        <Stack.Navigator 
          screenOptions={{ headerShown: false }}
          initialRouteName="Home">
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="CouponTemplates" component={CouponTemplates}/>
          <Stack.Screen name="Coupons" component={Coupons}/>
          <Stack.Screen name="Checkout" component={Checkout}/>
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}

export default App;