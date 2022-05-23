import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  ScrollView,
  FlatList,
} from "react-native";
import { signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";

import { useNavigation } from "@react-navigation/core";
import { async } from "@firebase/util";
import { COLOURS } from "./constants";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import ProductCard from "../componants/ProductCard";
import BundleCard from "../componants/BundleCard";
import { auth } from "../firebase";
import {
  getUserUId,
  addUser,
  deleteUser,
  editUser,
  getUserById,
  getUserByName,
  getUsers,
  subscribeUser,
} from "../models/user";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProductByName,
  getProducts,
  subscribeProduct,
} from "../models/products";

import {
  addbundle,
  deletebundle,
  editbundle,
  getBundleByName,
  getbundles,
  subscribebundle,
} from "../models/bundle";

const AdminArea = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [image, setimage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    getUserUId().then((id) => {
      console.log(id);
      getUserById(id).then((user) => {
        console.log(user);
        setEmail(user[0].email);
        setPassword(user[0].password);
        setname(user[0].name);
        setPhoneNumber(user[0].phoneNumber);
        setimage(user[0].image);
      });
    });
  }, []);
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 16,
        }}
      >
        <TouchableOpacity>
          <AntDesign
            name="logout"
            style={{
              fontSize: 18,
              color: COLOURS.backgroundMedium,
              padding: 12,
              borderRadius: 10,
              backgroundColor: COLOURS.backgroundLight,
            }}
            onPress={() => {
              navigation.navigate("Login");
            }}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              style={{ height: 50, width: 50, borderRadius: 75 }}
              source={image}
            />
          </TouchableOpacity>
          <Text>Welcome : {name}</Text>
        </View>
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="account-eye-outline"
            style={{
              fontSize: 20,
              color: COLOURS.backgroundMedium,
              padding: 12,
              borderRadius: 10,
            }}
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 26,
              color: COLOURS.black,
              fontWeight: "500",
              letterSpacing: 1,
            }}
          >
            Products Admin Panel
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: COLOURS.backgroundMedium,
              width: 150,
              height: 50,
              padding: 15,
              borderRadius: 20,
              alignItems: "center",
              marginBottom: 5,
            }}
            onPress={() => {
              navigation.navigate("AddProduct");
            }}
          >
            <Text>Add Product</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLOURS.backgroundMedium,
              width: 150,
              height: 50,
              padding: 15,
              borderRadius: 20,
              alignItems: "center",
              marginBottom: 5,
            }}
            onPress={() => {
              navigation.navigate("DeleteProduct");
            }}
          >
            <Text>Delete Product</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: COLOURS.backgroundMedium,
              width: 150,
              height: 50,
              padding: 15,
              borderRadius: 20,
              alignItems: "center",
              marginBottom: 5,
            }}
            onPress={() => {
              navigation.navigate("EditProduct");
            }}
          >
            <Text>Edit Product</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              color: COLOURS.black,
              fontWeight: "500",
              letterSpacing: 1,
            }}
          >
            Bundles Admin Panel
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: COLOURS.backgroundMedium,
              width: 150,
              height: 50,
              padding: 15,
              borderRadius: 20,
              alignItems: "center",
              marginBottom: 5,
            }}
            onPress={() => {
              navigation.navigate("AddBundle");
            }}
          >
            <Text>Add Bundle</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLOURS.backgroundMedium,
              width: 150,
              height: 50,
              padding: 15,
              borderRadius: 20,
              alignItems: "center",
              marginBottom: 5,
            }}
            onPress={() => {
              navigation.navigate("EditBundle");
            }}
          >
            <Text>Edit Bundle</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: COLOURS.backgroundMedium,
              width: 150,
              height: 50,
              padding: 15,
              borderRadius: 20,
              alignItems: "center",
              marginBottom: 5,
            }}
            onPress={() => {
              navigation.navigate("DeleteBundle");
            }}
          >
            <Text>Delete Bundle</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Text
            style={{
              fontSize: 26,
              color: COLOURS.black,
              fontWeight: "500",
              letterSpacing: 1,
            }}
          >
            Orders Admin Panel
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: COLOURS.backgroundMedium,
              width: 150,
              height: 50,
              padding: 15,
              borderRadius: 20,
              alignItems: "center",
              marginBottom: 5,
            }}
            onPress={()=>{navigation.navigate("Orders")}}
          >
            <Text>See Orders</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default AdminArea;

const styles = StyleSheet.create({});
