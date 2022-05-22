import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLOURS } from "./constants";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/core";
import AllBundlesCard from "../componants/AllBundlesCard";
import { getUserById, getUsers } from "../models/user";
import { auth } from "../firebase";
import { getUserUId } from "../models/user";
import {
  getBundleByName,
  getbundles,
  addbundle,
  editbundle,
  deletebundle,
  subscribebundle,
} from "../models/bundle";
// import { connect } from "react-redux";

export default function BundesScreen({ route, Navigation }) {
  const arr = [];
  const navigation = useNavigation();
  const [bundles, setBundles] = useState([]);
  const getBundleHandle = async () => {
    const arr = await getbundles();
    setBundles(arr);
  };

  useEffect(() => {
    getBundleHandle();
  }, []);

  // for user profile picture
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [image, setimage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    getUserUId().then((id) => {
      console.log(id);
      getUserById(id).then((user) => {
        console.log(user);
        setEmail(user[0].email);
        setPassword(user[0].password);
        setname(user[0].name);
        setPhoneNumber(user[0].phoneNumber);
        setimage(user[0].image);
      });
    });
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
            name="chevron-thin-left"
            style={{
              fontSize: 18,
              color: COLOURS.backgroundMedium,
              padding: 12,
              borderRadius: 10,
              backgroundColor: COLOURS.backgroundLight,
            }}
            onPress={() => {
              navigation.navigate("Home");
            }}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Image
              style={{ height: 50, width: 50, borderRadius: 75 }}
              source={image}
            />
          </TouchableOpacity>
          <Text>Welcome : {name}</Text>
        </View>
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
      <View
        style={{
          padding: 16,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TextInput
          placeholder="Search"
          style={{
            paddingVertical: 15,
            paddingHorizontal: 15,
            width: 400,
            backgroundColor: "#fffafa",
            borderRadius: 60,
            borderColor: "#C0C0C0",
            borderWidth: 1,
          }}
        />
        <TouchableOpacity>
          <AntDesign
            name="search1"
            style={{
              paddingVertical: 15,
              paddingHorizontal: 15,
              width: 50,
              backgroundColor: "#fffafa",
              borderRadius: 60,
              borderColor: "#C0C0C0",
              borderWidth: 1,
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ padding: 20 }}>
        <FlatList
          data={bundles}
          horizontal={false}
          renderItem={(itemData) => {
            return (
              <AllBundlesCard
                bundleName={itemData.item.bundleName}
                price={itemData.item.price}
                image={itemData.item.image}
                Type={itemData.item.image}
                id={itemData.item.id}
              />
            );
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
