import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { COLOURS } from "../screens/constants";

const AllBundlesCard = ({ bundleName, price, image, details, type }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Login");
      }}
    >
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          height: 150,
          width: 450,
          justifyContent: "space-evenly",
          backgroundColor: COLOURS.backgroundMedium,
          marginBottom: 10,
        }}
      >
        <Image
          style={{ width: 200, height: 150, justifyContent: "flex-start" }}
          source={image}
        />
        <View style={{ flexDirection: "column" }}>
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.black,
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

export default AllBundlesCard;
