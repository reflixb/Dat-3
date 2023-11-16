import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
  TextInput,
  Button,
} from "react-native";
import React, { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useUser } from "@clerk/clerk-react";

export default function EditProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const { user } = useUser();
  if (!user) return null;

  const updateUser = async () => {
    try {
      await user.update({
        firstName: firstName,
        lastName: lastName,
      });

      console.log("User profile updated successfully");
    } catch (error) {
      console.error("An error occurred while updating user profile:", error);
    }
  };

  console.log(firstName);

  //   const handleGenderChange = (itemValue) => {
  //     setSelectedGender(itemValue);
  //   };

  return (
    <View style={{ alignItems: "center" }}>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("./assets/men.jpeg")}
          style={{ width: 80, height: 80, borderRadius: 50 }}
        />
        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <Text>Username</Text>
          <Text>Email</Text>
        </View>
      </View>

      <TextInput
        value={firstName}
        onChangeText={setFirstName}
        placeholder="first name?"
        style={{
          backgroundColor: "white",
          width: "94%",
          padding: 10,
        }}
        placeholderTextColor="black"
      />

      <TextInput
        value={lastName}
        placeholder="last name ?"
        onChangeText={setLastName}
        style={{
          backgroundColor: "white",
          width: "94%",
          padding: 10,
          marginTop: 20,
        }}
        placeholderTextColor="black"
      />
      {/* 
      <Picker
        selectedValue={selectedGender}
        onValueChange={(itemValue, itemIndex) => setSelectedGender(itemValue)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker> */}

      <TextInput
        value={birthdate}
        onChangeText={setBirthdate}
        placeholder="birthdate"
        style={{
          backgroundColor: "white",
          width: "94%",
          padding: 10,
          marginTop: 20,
        }}
        placeholderTextColor="black"
      />

      <View style={{ width: "70%", padding: 25, marginTop: 20 }}>
        <Button title="Update Profile" onPress={updateUser} />
      </View>
    </View>
  );
}
