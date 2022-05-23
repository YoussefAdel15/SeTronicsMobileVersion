import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";

const SmallOrdersCard = ({ productName, price, image, details, type, id }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity>
      <View
        style={{
          height: 200,
          width: 100,
          marginRight: 40,
          justifyContent: "center",
        }}
      >
        <Image
          style={{ width: 130, height: 100, alignContent: "center" }}
          source={image}
        />
        <Text>
          {productName}
          {"\n"}price : {price} EGP
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default SmallOrdersCard;
