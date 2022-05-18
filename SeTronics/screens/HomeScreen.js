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
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { async } from "@firebase/util";
import { COLOURS } from "./DB/Database";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import productCard from "../componants/productCard";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProductByName,
  getProducts,
  subscribeProduct,
} from "../models/products";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  const getProductHandle = async () => {
    const arr = await getProducts();
    setProducts(arr);
    console.log(arr);
    console.log(products);
  };

  useEffect(async() => {
    await getProductHandle();
  }, []);

  const navigation = useNavigation();
  const handleLogout = async () => {
    await signOut(auth)
      .then(() => navigation.navigate("Login"))
      .catch((error) => alert(error.massage));
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
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
            <Entypo
              name="shopping-bag"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                backgroundColor: COLOURS.backgroundLight,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleLogout()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign out</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="cart"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundMedium,
                padding: 12,
                borderRadius: 10,
                borderWidth: 1,
                backgroundColor: COLOURS.backgroundLight,
              }}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginBottom: 10,
            padding: 16,
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
            SeTronics Shop Application
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.black,
              fontWeight: "400",
              letterSpacing: 1,
              lineHeight: 24,
            }}
          >
            We Sell everything related to computer hardware
          </Text>
        </View>
        <View
          style={{
            padding: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: COLOURS.black,
                fontWeight: "500",
                letterSpacing: 1,
              }}
            >
              Products
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.black,
                fontWeight: "400",
                opacity: 0.5,
                marginLeft: 10,
              }}
            >
              41
            </Text>
          </View>
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.blue,
              fontWeight: "400",
            }}
          >
            SeeAll
          </Text>
        </View>
        {/* <TouchableOpacity
          onPress={() =>
            addProduct({
              productName: "amd",
              price: 3000,
            })
          }
        >
          <Text>addProduct</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log(getProducts())}>
          <Text>get product</Text>
        </TouchableOpacity> */}
      </ScrollView>
      <FlatList
        data={products}
        // numColumns={2}
        renderItem={(itemData) => {
          <productCard
            productName={itemData.item.productName}
            price={itemData.item.price}
            details={itemData.item.details}
            type={itemData.item.type}
            image={itemData.item.image}
          />;
        }}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: COLOURS.white,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "50%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});
