import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLOURS } from "./constants";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/core";
import AllProductsCard from "../componants/AllProductsCard";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProductByName,
  getProducts,
  subscribeProduct,
} from "../models/products";

export default function ProductsScreen() {
  const arr = [];
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);

  const getProductHandle = async () => {
    const arr = await getProducts();
    setProducts(arr);
  };

  useEffect(() => {
    getProductHandle();
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
              navigation.navigate("Home");
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
          padding: 16,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          placeholder="Search"
          style={{
            paddingVertical: 15,
            paddingHorizontal: 15,
            width: 400,
            backgroundColor: "#fffafa",
            borderRadius: 60,
            borderColor: "#C0C0C0",
            borderWidth: 1,
          }}
        />
        <TouchableOpacity>
          <AntDesign
            name="search1"
            style={{
              paddingVertical: 15,
              paddingHorizontal: 15,
              width: 50,
              backgroundColor: "#fffafa",
              borderRadius: 60,
              borderColor: "#C0C0C0",
              borderWidth: 1,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 20 }}>
        <FlatList
          data={products}
          horizontal={false}
          renderItem={(itemData) => {
            return (
              <AllProductsCard
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
