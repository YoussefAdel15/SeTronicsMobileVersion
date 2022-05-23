import react, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  ScrollView,
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
          <View style={{
            
          }}>
            
            <FlatList
            style={{
              padding:20,
              // marginBottom:100
            }}
              data={arr}
              horizontal={false}
              renderItem={(itemData) => {
                return (
                  <SmallOrdersCard style={{
                    flexDirection: "row", flex: "100%", width: "75%",padding:50,
                    marginBottom:200
                  }}
                    image={itemData.item.image}
                    productName={itemData.item.productName}
                    price={itemData.item.price}
                  />
                );
              }}
            ></FlatList>
          </View>
          <View  style={{
           flexDirection: "column", flex: "100%", width: "75%"
          }}>
            <Text>The User: {user} Orderd This order</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    
  );
};

export default OrdersCard;
