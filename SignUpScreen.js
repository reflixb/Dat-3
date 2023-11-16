import * as React from "react";
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { StyleSheet } from "react-native";

export default function SignUpScreen({ onSignIn }) {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    console.log({ emailAddress });

    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {!pendingVerification && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Image style={styles.image} source={require("./assets/Login.jpeg")} />
          <Text style={{ marginBottom: 10, fontSize: 30 }}>SignUp</Text>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(email) => setEmailAddress(email)}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              value={password}
              placeholder="Password..."
              placeholderTextColor="#000"
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
            />
          </View>

          <TouchableOpacity onPress={onSignIn}>
            <Text>Already have an account?</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onSignUpPress} style={styles.loginBtn}>
            <Text style={{ color: "white" }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      )}
      {pendingVerification && (
        <View>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
          </View>
          <TouchableOpacity onPress={onPressVerify}>
            <Text>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
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
    width: 300,
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
    width: 300,
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});
