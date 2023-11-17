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
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
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
import * as Location from "expo-location";

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Газрын зураг" component={Home} />
      <Drawer.Screen name="Төлбөр" component={Payment} />
      <Drawer.Screen name="Тохиргоо" component={SignOut} />
    </Drawer.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Гэр"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Төлбөр"
        component={Payment}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

function Payment() {
  return (
    <View>
      <Text>Төлбөр</Text>
    </View>
  );
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
        style={{ marginTop: 10 }}>
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

function HomeScreen() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setCurrentLocation({ latitude, longitude });
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {currentLocation && (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="You are here"
            description="Your current location"
          />
        </MapView>
      )}
    </View>
  );
}
