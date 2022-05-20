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
import { COLOURS } from "./constants";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ProductCard from "../componants/ProductCard";
import BundleCard from "../componants/BundleCard";
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

const HomeScreen = () => {
  // for products
  const [products, setProducts] = useState([]);

  const getProductHandle = async () => {
    const arr = await getProducts();
    setProducts(arr);
    console.log(arr);
    console.log(products[0]);
  };

  useEffect(() => {
    getProductHandle();
  }, []);

  //for bundles

  const [bundle, setBundles] = useState([]);

  const getBundleHandle = async () => {
    const arr = await getbundles();
    setBundles(arr);
    console.log(arr);
  };

  useEffect(() => {
    getBundleHandle();
  }, []);

  //buttons (we be removed)
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
            onPress={() => navigation.navigate("Profile")}
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
              {products.length}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              fontSize: 14,
              color: COLOURS.blue,
              fontWeight: "400",
            }}
            onPress={() => {
              navigation.navigate("Products");
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.blue,
                fontWeight: "400",
              }}
            >
              SeeAll
            </Text>
          </TouchableOpacity>
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
        {/* products */}
        <View style={{ paddingLeft: 20 }}>
          <FlatList
            data={products.slice(0, 2)}
            horizontal={true}
            renderItem={(itemData) => {
              return (
                <ProductCard
                  productName={itemData.item.productName}
                  price={itemData.item.price}
                  details={itemData.item.details}
                  type={itemData.item.type}
                  image={itemData.item.image}
                />
              );
            }}
          />
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
              Bundles
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
              {bundle.length}
            </Text>
          </View>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.blue,
                fontWeight: "400",
              }}
            >
              SeeAll
            </Text>
          </TouchableOpacity>
        </View>
        {/* bundle */}
        <View style={{ paddingLeft: 20 }}>
          <FlatList
            data={bundle.slice(0, 2)}
            horizontal={true}
            renderItem={(itemData) => {
              return (
                <BundleCard
                  bundleName={itemData.item.bundleName}
                  price={itemData.item.price}
                  specs={itemData.item.specs}
                  image={itemData.item.image}
                />
              );
            }}
          />
        </View>
      </ScrollView>
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
