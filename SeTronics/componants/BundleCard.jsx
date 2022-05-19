import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";

const BundleCard = ({ bundleName, price, image, specs }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Login");
      }}
    >
      <View
        style={{
          height: 150,
          width: 150,
          borderWidth: 1,
          marginRight: 40,
          justifyContent: "center",
        }}
      >
        <Image style={{ width: 100, height: 100 }} source={image} />
        <Text>
          {bundleName} {price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default BundleCard;
