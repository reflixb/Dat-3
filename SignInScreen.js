import React from "react";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import { StyleSheet } from "react-native";
import SignUpScreen from "./SignUpScreen";

export default function SignInScreen({ onSignIn }) {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [appear, setAppear] = useState(false);
  const [error, setError] = useState("");

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err) {
      setError(JSON.stringify(err.errors[0].longMessage));
      console.log(JSON.stringify(err));
    }
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image style={styles.image} source={require("./assets/Login.jpeg")} />
      {error !== "" && <Text>{error}</Text>}

      <Text style={{ marginBottom: 10, fontSize: 30 }}>Login</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>
      <TouchableOpacity onPress={onSignIn}>
        <Text>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSignInPress} style={styles.loginBtn}>
        <Text style={{ color: "white" }}>Sign in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
    width: 200,
    height: 200,
  },
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});
