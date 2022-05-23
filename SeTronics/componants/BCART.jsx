import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { COLOURS } from "../screens/constants";

const BCART = ({ bundleName, price, image, specs, Type, id }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        console.log(
          bundleName,
          " ",
          price,
          " ",
          image,
          " ",
          specs,
          " ",
          Type,
          " ",
          id
        );
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
          borderRadius: 10,
        }}
      >
        <Image
          style={{
            width: 200,
            height: 150,
            justifyContent: "flex-start",
            borderRadius: 10,
          }}
          source={image}
        />
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.black,
              flex: "100%",
              width: "75%",
              fontWeight: "400",
              letterSpacing: 1,
              lineHeight: 24,
              padding: 15,
              marginTop: 20,
            }}
          >
            {bundleName}
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

export default BCART;
