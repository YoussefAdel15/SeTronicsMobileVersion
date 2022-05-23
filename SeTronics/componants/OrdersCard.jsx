import react, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import SmallOrdersCard from "./smallOrdersCard";

const OrdersCard = ({ arr, user }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => {}}>
      <View
        style={{
          height: 170,
          width: "100%",
          marginRight: 40,
          justifyContent: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <FlatList
              data={arr}
              horizontal={true}
              renderItem={(itemData) => {
                return (
                  <SmallOrdersCard
                    image={itemData.item.image}
                    productName={itemData.item.productName}
                    price={itemData.item.price}
                  />
                );
              }}
            ></FlatList>
          </View>
          <View>
            <Text>The User: {user} Orderd This order</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrdersCard;
