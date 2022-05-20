import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/core";
import Entypo from "react-native-vector-icons/Entypo";
import { getUserById, getUsers } from "../models/user";
import { auth } from "../firebase";
import { getUserUId, deleteUser } from "../models/user";
import { COLOURS } from "./constants";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [image, setimage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
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
        setAddress(user[0].address);
      });
    });
  }, []);

  const handleDelete = () => {
    getUserUId().then((id) => {
      console.log(id);
      getUserById(id).then((user) => {
        console.log(user);
        deleteUser(user[0]);
        navigation.navigate("Login");
      });
    });
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLOURS.backgroundLight }}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Entypo
          name="chevron-thin-left"
          style={{
            width: "10%",
            fontSize: 18,
            color: COLOURS.backgroundMedium,
            padding: 12,
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      </TouchableOpacity>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsHorizontalScrollIndicator={false}
      >
        {/* current data */}
        <Image style={styles.userImg} source={image} />
        <View style={{ flexDirection: "row", padding: 5 }}>
          <Text>UserName : </Text>
          <Text>{name}</Text>
        </View>
        <View style={{ flexDirection: "row", padding: 5 }}>
          <Text>PhoneNumber : </Text>
          <Text>{phoneNumber}</Text>
        </View>
        <View style={{ flexDirection: "row", padding: 5 }}>
          <Text>Address : </Text>
          <Text>{address}</Text>
        </View>
        {/* if you want to edit your data */}
        <View style={{ padding: 10, flexDirection: "row", marginTop: 10 }}>
          <TouchableOpacity
            style={{
              backgroundColor: "#0782F9",
              width: "45%",
              height: 50,
              padding: 15,
              borderRadius: 20,
              alignItems: "center",
              marginRight: 20,
              marginBottom: 5,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.white,
                fontWeight: "400",
                letterSpacing: 1,
                lineHeight: 24,
              }}
            >
              Edit Your Data
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLOURS.red,
              width: "55%",
              height: 50,
              padding: 15,
              borderRadius: 20,
              alignItems: "center",
              marginBottom: 5,
            }}
            onPress={() => {
              handleDelete();
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.white,
                fontWeight: "400",
                letterSpacing: 1,
                lineHeight: 24,
              }}
            >
              Delete Your Account
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "white",
            width: "55%",
            height: 50,
            padding: 15,
            borderRadius: 20,
            alignItems: "center",
            marginBottom: 5,
            borderColor: "#0782F9",
            borderWidth: 2,
          }}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "400",
              color: "#0782F9",
              fontWeight: "400",
              letterSpacing: 1,
              lineHeight: 24,
            }}
          >
            LogOut
          </Text>
        </TouchableOpacity>
        <View style={{ marginTop: 50 }}>
          <TouchableOpacity
            style={{
              backgroundColor: COLOURS.backgroundMedium,
              width: 150,
              height: 50,
              padding: 15,
              borderRadius: 20,
              alignItems: "center",
              marginBottom: 5,
            }}
            onPress={() => {
              navigation.navigate("AboutUs");
            }}
          >
            <Text>About Us</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.backgroundLight,
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
});
