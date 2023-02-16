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
import { StreamChat } from "stream-chat";
import SignIn from "./screens/SignIn";
import AuthContext from "./contexts/Auth";
import { Chat, OverlayProvider } from "stream-chat-expo";

//.env File
const API_KEY = "yqag5xdkt29k";
const client = StreamChat.getInstance(API_KEY)

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

  const [userId, setUserId] = useState("");

//   useEffect(() => {
//     const connectUser = async () => {
//       await client.connectUser(
//         {
//           id: 'iouAdmin',
//           name: "Admin",
//           image: 'https://i.imgur.com/fr9Jz14.png',
//         },
//         //Will need jwt token
//         //Turn auth back on in stream dashboard
//         client.devToken('iouAdmin')   
//       );
//       console.log("User connected");
//   };
// })

  useEffect(() => {
    return () => client.disconnectUser();
  }, []);

  if(!loaded) return null;

  return (
    <NavigationContainer theme={theme}>
      <AuthContext.Provider value={{ userId, setUserId }}>
        <OverlayProvider>
          <Chat client={client}>
            <Provider store={store}>
              <Stack.Navigator 
                screenOptions={{ headerShown: false }}
                initialRouteName="SignIn">
                  {!userId ? (
                    <Stack.Screen name="SignIn" component={SignIn} />
                  ) : (
                    <>
                      <Stack.Screen name="Home" component={Home}/>
                      <Stack.Screen name="CouponTemplates" component={CouponTemplates}/>
                      <Stack.Screen name="Coupons" component={Coupons}/>
                      <Stack.Screen name="Checkout" component={Checkout}/>
                  </>
                  )}
              </Stack.Navigator>
            </Provider>
          </Chat>
        </OverlayProvider>       
      </AuthContext.Provider>
    </NavigationContainer>
  );
}

export default App;