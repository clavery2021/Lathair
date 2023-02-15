import React, { useContext, useState } from "react";
import { View, TextInput, StyleSheet, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useChatContext } from "stream-chat-expo";
import AuthContext from "../contexts/Auth";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");

  const { setUserId } = useContext(AuthContext);

  const { client } = useChatContext();

  const connectUser = async (username: string, fullName: string) => {
    await client.connectUser(
      {
        id: username,
        name: fullName,
      },
      client.devToken(username)
    );
    setUserId(username);
  };

  const signUp = () => {
    connectUser(username, fullName);
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.inputContainer}>
        {/* //change to email */}
        {/* I think once the user makes an account ask for more info such as
        full name, DOB, ...
        sign up with just email and pw makes it lightweight */}
        <TextInput
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
          style={styles.input}
        />
      </View>

      <View style={styles.inputContainer}>
        {/* change to password */}
        <TextInput
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full name"
          style={styles.input}
        />
        {/* confirm pw. */}
      </View>

      <Pressable onPress={signUp} style={styles.button}>
        <Text>Sign up</Text>
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
    backgroundColor: "#256CFF",
    padding: 15,
    alignItems: "center",
    marginVertical: 10,
  },
});

export default SignIn;