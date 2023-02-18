import React, { useCallback, useContext, useState } from "react";
import { View, TextInput, StyleSheet, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChatContext } from "stream-chat-expo";
import { COLORS } from "../constants";
import AuthContext from "../contexts/Auth";

//More work needs to be done in order to make sure pw is secure 
//and checks to see if user exists.

const SignIn = () => {
  const [signUpData, setSignUpData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
  });

  const [signInData, setSignInData] = useState({
    userName: "",
    password: "",
  });

  const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return passwordPattern.test(password);
  };

  const { setUserId } = useContext(AuthContext);

  const { client } = useChatContext();

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
  };


  const signUp = useCallback(() => {
  
    if (!validatePassword(signUpData.password)) {
      alert("Please enter a password that contains at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number.");
      return;
    }
    
    if (signUpData.password !== signUpData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    connectNewUser(signUpData.userName, signUpData.password)
  }, [signUpData]);


  const signIn = useCallback(() => {
    connectUser(signInData.userName, signInData.password)
  }, [signInData]);

  const handleFormChange = (key, value) => {
    setSignUpData((prevSignUpData) => ({
      ...prevSignUpData,
      [key]: value,
    }));
  };

  const handleSignInChange = (key, value) => {
    setSignInData((prevSignInData) => ({
      ...prevSignInData,
      [key]: value,
    }));
  };

  //Add in Sign in below for now. 
  //Then extract a sign up and sign in to 2 seperate components

  return (
    <SafeAreaView style={styles.root}>
        {Object.entries(signUpData).map(([key, value]) => (
        <View key={key} style={styles.inputContainer}>
          <TextInput
            value={value}
            onChangeText={(newValue) => handleFormChange(key, newValue)}
            // replaces camelcase
            placeholder={key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
            secureTextEntry={key === "password" || key === "confirmPassword"}
            textAlign="center"
          />
        </View>
      ))}
      <Pressable onPress={signUp} style={styles.button}>
        <Text>Sign Up</Text>
      </Pressable>
      {Object.entries(signInData).map(([key, value]) => (
        <View key={key} style={styles.inputContainer}>
          <TextInput
            value={value}
            onChangeText={(newValue) => handleSignInChange(key, newValue)}
            placeholder={key.replace(/([A-Z])/g, " $1").replace(/^./, str => str.toUpperCase())}
            secureTextEntry={key === "password"}
            textAlign="center"
          />
        </View>
      ))}
      <Pressable onPress={signIn} style={styles.button}>
        <Text>Sign In</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    margin: 10,
  },
  inputContainer: {
    backgroundColor: "white",
    padding: 10,
    marginVertical: 10,
  },
  input: {},
  button: {
    backgroundColor: COLORS.primary,
    padding: 15,
    alignItems: "center",
    marginVertical: 10,
  },
});

export default SignIn;