import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function Comments({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text> Comments</Text>
      <View style={{ flexDirection: "row" }}>
        <Button
          icon="camera"
          mode="contained"
          onPress={() => navigation.navigate("Detail")}
        >
          Details
        </Button>
      </View>
    </View>
  );
}
