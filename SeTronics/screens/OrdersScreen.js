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
import { auth } from "../firebase";
import {
  getOrders,
  addOrder,
  deleteOrder,
  subscribeProduct,
} from "../models/order";
import OrdersCard from "../componants/OrdersCard";

const OrdersScreen = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);

  const getOrdersHandler = async () => {
    const arr = await getOrders();
    setOrders(arr);
  };
  useEffect(() => {
    getOrdersHandler();
  }, []);
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
      <View style={{ marginTop: 50 }}>
        <FlatList
          data={orders}
          horizontal={false}
          renderItem={(itemData) => {
            return (
              <OrdersCard
                arr={itemData.item.ProductInCart}
                user={itemData.item.user}
              />
            );
          }}
        ></FlatList>
      </View>
    </View>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({});
