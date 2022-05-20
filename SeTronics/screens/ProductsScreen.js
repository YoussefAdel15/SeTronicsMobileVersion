import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLOURS } from "./constants";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/core";
import ProductCard from "../componants/ProductCard";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProductByName,
  getProducts,
  subscribeProduct,
} from "../models/products";

export default function ProductsScreen() {
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

      <FlatList
        data={products}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
