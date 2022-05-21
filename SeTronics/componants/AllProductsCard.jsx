import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { COLOURS } from "../screens/constants";
import ProductInfo from "../screens/productinfo";

const AllProductsCard = ({ productName, price, image, details, type }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        // this is the navigation to the productinfo page check
        navigation.navigate(ProductInfo({productName, price, image, details, type }));
      }}
    >
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          height: "35%",
          width: "95% ",
          justifyContent: "space-evenly",
          backgroundColor: COLOURS.backgroundMedium,
          marginBottom: 10,
        }}
      >
        <Image
          style={{ width: 200, height: 150, justifyContent: "flex-start" }}
          source={image}
        />
        <View style={{ flexDirection: "column",flex:"100%" ,width:"75%"}}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "300",
              padding: 15,
              marginTop: 20,
            }}
          >
            {productName}
            {"\n"}price : {price} EGP
          </Text>
          <View style={{ flexDirection: "row" }}>
            {/* <TouchableOpacity>
              <TouchableOpacity>
                <Entypo
                  name=
                  style={{
                    fontSize: 18,
                    color: COLOURS.backgroundMedium,
                    padding: 12,
                    borderRadius: 10,
                    backgroundColor: COLOURS.backgroundLight,
                  }}
                />
              </TouchableOpacity>
            </TouchableOpacity> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AllProductsCard;
