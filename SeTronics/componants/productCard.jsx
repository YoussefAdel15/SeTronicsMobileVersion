import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const ProductCard = ({ productName, price, image, details, type }) => {
  return (
    <View style={{ height: 100, width: 100, borderWidth: 1 }}>
      <Image style={{ width: 100, height: 100 }} source={image} />
      <Text>
        {productName} {price} {details} {type}
      </Text>
    </View>
  );
};

export default ProductCard;
