import React, { useCallback, useContext, useState } from "react";
import { connectNewUser, connectUser } from "./utils/signIn/signInUtils";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import styles from "../assets/styles";
import Svg, { Image, Ellipse, ClipPath } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withDelay,
  runOnJS,
} from "react-native-reanimated";

const SignIn = () => {
  const { height, width } = Dimensions.get("window");
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  
  const [registerData, setRegisterData] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  
  const handleLoginChange = useCallback((key, newValue) => {
    setLoginData((prev) => ({ ...prev, [key]: newValue }));
  }, []);
  
  const handleRegisterChange = useCallback((key, newValue) => {
    setRegisterData((prev) => ({ ...prev, [key]: newValue }));
  }, []);
 
  const handleLogin = useCallback(() => {
    connectUser({email: loginData.email, password: loginData.password});
  }, [loginData]);
  
  const handleRegistration = useCallback(() => {
    connectNewUser({email: registerData.email, userName: registerData.userName, password: registerData.password});
  }, [registerData]);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(
      imagePosition.value,
      [0, 1],
      [-height / 2, 0]
    );
    return {
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const buttonsAnimatedStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [250, 0]);
    return {
      opacity: withTiming(imagePosition.value, { duration: 500 }),
      transform: [
        { translateY: withTiming(interpolation, { duration: 1000 }) },
      ],
    };
  });

  const closeButtonContainerStyle = useAnimatedStyle(() => {
    const interpolation = interpolate(imagePosition.value, [0, 1], [180, 360]);
    return {
      opacity: withTiming(imagePosition.value === 1 ? 0 : 1, { duration: 800 }),
      transform: [
        { rotate: withTiming(interpolation + "deg", { duration: 1000 }) },
      ],
    };
  });

  const formAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        imagePosition.value === 0
          ? withDelay(400, withTiming(1, { duration: 800 }))
          : withTiming(0, { duration: 300 }),
    };
  });

  const formButtonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: formButtonScale.value}]
    }
  })

  const loginHandler = () => {
    imagePosition.value = 0;
    if (isRegistering) {
      runOnJS(setIsRegistering)(false);
    }
  };

  const registerHandler = () => {
    imagePosition.value = 0;
    if (!isRegistering) {
      runOnJS(setIsRegistering)(true);
    }
  };
return (
<Animated.View style={styles.container}>
  <Animated.View style={[StyleSheet.absoluteFill, imageAnimatedStyle]}>
    <Svg height={height + 100} width={width}>
      <ClipPath id="clipPathId">
        <Ellipse cx={width / 2} rx={height} ry={height + 100} />
      </ClipPath>
      <Image
        href={require("../assets/login-background.jpg")}
        width={width + 100}
        height={height + 100}
        preserveAspectRatio="xMidYMid slice"
        clipPath="url(#clipPathId)"
      />
    </Svg>
    <Animated.View style={[styles.closeButtonContainer, closeButtonContainerStyle]}>
      <Text onPress={() => (imagePosition.value = 1)}>X</Text>
    </Animated.View>
  </Animated.View>

  <View style={styles.bottomContainer}>
    <Animated.View style={buttonsAnimatedStyle}>
      <Pressable style={styles.button} onPress={loginHandler}>
        <Text style={styles.buttonText}>LOG IN</Text>
      </Pressable>
    </Animated.View>
    <Animated.View style={buttonsAnimatedStyle}>
      <Pressable style={styles.button} onPress={registerHandler}>
        <Text style={styles.buttonText}>REGISTER</Text>
      </Pressable>
    </Animated.View>

    <Animated.View style={[styles.formInputContainer, formAnimatedStyle]}>
      <TextInput
        placeholder="Email"
        placeholderTextColor="black"
        style={styles.textInput}
        value={isRegistering ? registerData.email : loginData.email}
        onChangeText={(newValue) => isRegistering
          ? handleRegisterChange("email", newValue)
          : handleLoginChange("email", newValue)
        }
      />

      {isRegistering && (
        <TextInput
          placeholder="User Name"
          placeholderTextColor="black"
          style={styles.textInput}
          value={registerData.userName}
          onChangeText={(newValue) => handleRegisterChange("userName", newValue)}
        />
      )}

      <TextInput
        placeholder="Password"
        placeholderTextColor="black"
        style={styles.textInput}
        secureTextEntry={true}
        value={isRegistering ? registerData.password : loginData.password}
        onChangeText={(newValue) => isRegistering
          ? handleRegisterChange("password", newValue)
          : handleLoginChange("password", newValue)
        }
      />

      {isRegistering && (
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="black"
          style={styles.textInput}
          secureTextEntry={true}
          value={registerData.confirmPassword}
          onChangeText={(newValue) => handleRegisterChange("confirmPassword", newValue)}
        />
      )}

      <Animated.View style={[styles.formButton, formButtonAnimatedStyle]}>
        <Pressable style={styles.button} onPress={isRegistering ? handleRegistration : handleLogin}>
          <Text style={styles.buttonText}>
            {isRegistering ? "REGISTER" : "LOG IN"}
          </Text>
        </Pressable>
      </Animated.View>
    </Animated.View>
  </View>
</Animated.View>
)
}

export default SignIn;