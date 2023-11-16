import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";
import {
  Chip,
  PaperProvider,
  Button,
  ActivityIndicator,
  FAB,
  Card,
} from "react-native-paper";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RenderHtml from "react-native-render-html";
import { Image } from "react-native";
import Details from "./detail";
import Comments from "./comment";
import { useState, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { LoginFlow } from "./loginFlow";
import EditProfile from "./editProfile";
import { useUser } from "@clerk/clerk-react";

const screenWidth = Dimensions.get("window").width;

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Stack" component={Home} />
      <Drawer.Screen name="Article" component={SettingsScreen} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

function SettingsScreen() {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
}

function Profile({ navigation }) {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    console.log(user);
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 8,
            backgroundColor: "blue",
            borderRadius: 15,
            width: "95%",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("./assets/men.jpeg")}
              style={{ width: 80, height: 80, borderRadius: 50 }}
            />
            <View style={{ marginLeft: 20 }}>
              <Text style={{ color: "white" }}>{user.fullName}</Text>
              <Text style={{ color: "white" }}>Email</Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
            <Feather name="edit" size={34} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const SignOut = () => {
  const { isLoaded, signOut } = useAuth();
  if (!isLoaded) {
    return null;
  }
  return (
    <View>
      <Button
        title="Sign Out"
        onPress={() => {
          signOut();
        }}
        mode="contained"
        style={{ marginTop: 10 }}
      >
        {" "}
        Sign Out
      </Button>
    </View>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  const REACT_APP_CLERK_PUBLISHABLE_KEY =
    "pk_test_Y3J1Y2lhbC1saW9uZmlzaC0zNC5jbGVyay5hY2NvdW50cy5kZXYk";
  return (
    <ClerkProvider publishableKey={REACT_APP_CLERK_PUBLISHABLE_KEY}>
      <PaperProvider>
        <SignedIn>
          <NavigationContainer>
            <DrawerNavigator />
          </NavigationContainer>
          <SignOut />
        </SignedIn>

        <SignedOut>
          <LoginFlow />
        </SignedOut>
      </PaperProvider>
    </ClerkProvider>
  );
}

function Home() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail" component={Details} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Comment" component={Comments} />
    </Stack.Navigator>
  );
}

function HomeScreen({ navigation }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("https://dev.to/api/articles?username=ben")
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
      });
  }, []);

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text> HomeScreen</Text>
        <View style={{ flexDirection: "row" }}>
          {/* <Button
            icon="camera"
            mode="contained"
            onPress={() => navigation.navigate("Detail", { id: 23 })}
          >
            Details
          </Button> */}
        </View>

        {articles.map((article) => (
          <View key={article.id}>
            <Card
              style={{ width: screenWidth, marginTop: 30 }}
              onPress={() => navigation.navigate("Detail", { id: article.id })}
            >
              <Card.Content>
                <Card.Cover source={{ uri: article.cover_image }}></Card.Cover>
                <Text>{article.title}</Text>
              </Card.Content>
            </Card>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
