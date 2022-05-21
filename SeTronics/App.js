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
import AboutUsScreen from "./screens/AboutUsScreen";
import AdminArea from "./screens/AdminArea.js";
import AddProductsScreen from "./screens/AddProductsScreen.js";
import DeleteProductScreen from "./screens/DeleteProductScreen.js";
import EditProductScreen from "./screens/EditProductScreen.js";
import EditUserScreen from "./screens/EditUserScreen.js";
import AddBundlesScreen from "./screens/AddBundleScreen.js";
import EditBundleScreen from "./screens/EditBundleScreen.js";
import DeleteBundleScreen from "./screens/DeleteBundleScreen.js";
import ProductInfo from "./screens/productinfo.js";

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
          name="Admin"
          component={AdminArea}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AddProduct"
          component={AddProductsScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DeleteProduct"
          component={DeleteProductScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="EditProduct"
          component={EditProductScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AddBundle"
          component={AddBundlesScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="EditBundle"
          component={EditBundleScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="DeleteBundle"
          component={DeleteBundleScreen}
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
          name="EditUser"
          component={EditUserScreen}
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
        <Stack.Screen
          options={{ headerShown: false }}
          name="Productinfo"
          component={ProductInfo}
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
