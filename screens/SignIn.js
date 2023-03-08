import React, { useCallback, useContext, useState } from "react";
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
  withSequence,
  withSpring
} from "react-native-reanimated";
import AuthContext from "../contexts/Auth";
import { useChatContext } from "stream-chat-expo";


//   return (
//     <SafeAreaView style={styles.root}>
//         {Object.entries(signUpData).map(([key, value]) => (
//         <View key={key} style={styles.inputContainer}>
//           <TextInput
//             value={value}
//             onChangeText={(newValue) => handleFormChange(key, newValue)}
//             // replaces camelcase
//             placeholder={key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
//             secureTextEntry={key === "password" || key === "confirmPassword"}
//             textAlign="center"
//           />
//         </View>
//       ))}
//       <Pressable onPress={signUp} style={styles.button}>
//         <Text>Sign Up</Text>
//       </Pressable>
//       {Object.entries(signInData).map(([key, value]) => (
//         <View key={key} style={styles.inputContainer}>
//           <TextInput
//             value={value}
//             onChangeText={(newValue) => handleSignInChange(key, newValue)}
//             placeholder={key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
//             secureTextEntry={key === "password"}
//             textAlign="center"
//           />
//         </View>
//       ))}
//       <Pressable onPress={signIn} style={styles.button}>
//         <Text>Sign In</Text>
//       </Pressable>
//     </SafeAreaView>
//   );
// };


const SignIn = () => {
  const { height, width } = Dimensions.get("window");
  const imagePosition = useSharedValue(1);
  const formButtonScale = useSharedValue(1);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });
  
  const [registerData, setRegisterData] = useState({
    email: "",
    userName: "",
    password: "",
    confirmPassword: "",
  });
  
  const { setUserId } = useContext(AuthContext);
  const { client } = useChatContext();

    const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordPattern.test(password);
  };

  const connectNewUser = async (userName: string, password: string) => {
    await client.connectUser(
      {
        id: userName,
        password: password,
      },
      client.devToken(userName)
    );
    setUserId(userName);
  };

  const connectUser = async (userName: string, password: string) => {
    await client.connectUser(
      {
        id: userName,
        password: password,
      },
      client.devToken(userName)
    );
    setUserId(userName);
    console.log(id)
  };

  const handleLoginChange = useCallback((key, newValue) => {
    setLoginData((prev) => ({ ...prev, [key]: newValue }));
  }, []);
  
  const handleRegisterChange = useCallback((key, newValue) => {
    setRegisterData((prev) => ({ ...prev, [key]: newValue }));
  }, []);
 
  const handleLogin = useCallback(() => {
    connectUser(loginData.userName, loginData.password)
    console.log(loginData);
  }, [loginData]);

  const handleRegistration = useCallback(() => {
    connectNewUser(registerData.userName, registerData.email, registerData.password);
  }, [registerData]);
  
  
// const signUp = useCallback(() => {
  
//   if (!validatePassword(signUpData.password)) {
//     alert("Please enter a password that contains at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number.");
//     return;
//   }
  
//   if (signUpData.password !== signUpData.confirmPassword) {
//     alert("Passwords do not match!");
//     return;
//   }
//   connectNewUser(signUpData.userName, signUpData.password)
// }, [signUpData]);

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
        placeholder="User name"
        placeholderTextColor="black"
        style={styles.textInput}
        value={isRegistering ? registerData.userName : loginData.userName}
        onChangeText={(newValue) => isRegistering
          ? handleRegisterChange("userName", newValue)
          : handleLoginChange("userName", newValue)
        }
      />

      {isRegistering && (
        <TextInput
          placeholder="Email"
          placeholderTextColor="black"
          style={styles.textInput}
          value={registerData.email}
          onChangeText={(newValue) => handleRegisterChange("email", newValue)}
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