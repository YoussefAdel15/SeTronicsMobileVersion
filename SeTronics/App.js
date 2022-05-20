import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen.js";
import HomeScreen from "./screens/HomeScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import ProductsScreen from "./screens/ProductsScreen.js";
import SignupScreen from "./screens/SignupScreen.js";
import BundlesScreen from "./screens/BundlesScreen";
import AboutUsScreen from "./screens/AboutUsScreen"

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignUp"
          component={SignupScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={ProfileScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AboutUs"
          component={AboutUsScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Products"
          component={ProductsScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Bundles"
          component={BundlesScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
