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
import ProductCard from "../componants/ProductCard";
import BundleCard from "../componants/BundleCard";
import { auth, db } from "../firebase";
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
import { doc, setDoc } from "firebase/firestore";

const EditProductScreen = () => {
  const navigation = useNavigation();
  const [oldProductName, setOldProductName] = useState("");
  const [productName, setProductName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("");
  const [details, setDetails] = useState("");

  const handleEditProduct = async () => {
    const object = await getProductByName(oldProductName);
    console.log(object);
    try {
      setDoc(doc(db, "products", object.id), {
        productName,
        imageURL,
        price,
        type,
        details,
      });
      alert("edit done on Product with old Product name : " + oldProductName);
    } catch (err) {
      alert(err.massage);
    }
  };
  return (
    <View style={styles.container} behavior={"padding"}>
      <View
        style={{
          width: "10%",
          fontSize: 18,
          color: COLOURS.backgroundMedium,
          padding: 12,
          borderRadius: 10,
        }}
      >
        <TouchableOpacity>
          <Entypo
            name="chevron-thin-left"
            style={{
              fontSize: 18,
              color: COLOURS.backgroundMedium,
              padding: 12,
              borderRadius: 10,
              backgroundColor: COLOURS.backgroundLight,
            }}
            onPress={() => {
              navigation.navigate("Admin");
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <Text
          style={{
            fontSize: 26,
            color: COLOURS.black,
            fontWeight: "500",
            letterSpacing: 1,
          }}
        >
          Product Name You Want To Edit
        </Text>
        <TextInput
          placeholder="Old ProductName"
          value={oldProductName}
          onChangeText={(text) => setOldProductName(text)}
          style={styles.input}
        />
        <Text
          style={{
            fontSize: 26,
            color: COLOURS.black,
            fontWeight: "500",
            letterSpacing: 1,
            marginTop: 5,
          }}
        >
          New Data
        </Text>
        <TextInput
          placeholder="productName"
          value={productName}
          onChangeText={(text) => setProductName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="ImageURL"
          value={imageURL}
          onChangeText={(text) => setImageURL(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="price"
          value={price}
          onChangeText={(text) => setPrice(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="details"
          value={details}
          onChangeText={(text) => setDetails(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="type"
          value={type}
          onChangeText={(text) => setType(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            handleEditProduct();
          }}
          style={[styles.button, , styles.buttonOutline]}
        >
          <Text style={[styles.buttonOutlineText]}>Edit Product</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  image: {
    width: 250,
    height: 250,
  },
});
