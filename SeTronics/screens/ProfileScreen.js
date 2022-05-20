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
import { getUsers } from "../models/user";
import { auth } from "../firebase";

const ProfileScreen = () => {
  const [user, setUser] = useState([]);
  const [image, setImage] = useState("");
  const initialInfo = async () => {
    const array = await getUsers();
    const object = array.find((e) => e.email === auth.currentUser.email);
    console.log(object);
    console.log(user);
    setImage(object.image);
  };
  useEffect(() => {
    initialInfo();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsHorizontalScrollIndicator={false}
      >
        {/* <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text>Profile Page</Text>
        </TouchableOpacity> */}
        <Image style={styles.userImg} source={image} />
        <Text style={styles.userName}>Youssef Adel</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
