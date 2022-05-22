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
import AllProductsCard from "../componants/AllProductsCard";
import { getUserById, getUsers } from "../models/user";
import { auth } from "../firebase";
import { getUserUId } from "../models/user";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProductByName,
  getProducts,
  subscribeProduct,
} from "../models/products";

export default function ProductsScreen({ route, Navigation }) {
  const arr = [];
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const getProductHandle = async () => {
    const arr = await getProducts();
    setProducts(arr);
  };

  useEffect(() => {
    getProductHandle();
  }, []);

  //for user profile icon
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

  //for getting cattegories
  const [type, setType] = useState("all");

  // for search
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
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
            width: "100%",
            backgroundColor: "#fffafa",
            borderRadius: 60,
            borderColor: "#C0C0C0",
            borderWidth: 1,
          }}
          onChangeText={(text) => {
            setSearchTerm(text);
          }}
        />
      </View>
      <View
        style={{ padding: 20, width: "100%", marginRight: 10, marginLeft: 10 }}
      >
        <FlatList
          // style={{
          //   marginRight:10,marginLeft:10
          // }}
          data={["ram", "cpu", "gpu", "case", "cooler", "motherboard", "all"]}
          horizontal={true}
          renderItem={(itemData) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setType(itemData.item);
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>{itemData.item}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={{ padding: 20 }}>
        <FlatList
          data={products}
          horizontal={false}
          renderItem={(itemData) => {
            if (itemData.item.type === type) {
              if (searchTerm === "") {
                return (
                  <AllProductsCard
                    productName={itemData.item.productName}
                    price={itemData.item.price}
                    details={itemData.item.details}
                    type={itemData.item.type}
                    image={itemData.item.image}
                    id={itemData.item.id}
                  />
                );
              } else if (
                itemData.item.productName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return (
                  <AllProductsCard
                    productName={itemData.item.productName}
                    price={itemData.item.price}
                    details={itemData.item.details}
                    type={itemData.item.type}
                    image={itemData.item.image}
                    id={itemData.item.id}
                  />
                );
              }
            } else if (type === "all") {
              if (searchTerm === "") {
                return (
                  <AllProductsCard
                    productName={itemData.item.productName}
                    price={itemData.item.price}
                    details={itemData.item.details}
                    type={itemData.item.type}
                    image={itemData.item.image}
                    id={itemData.item.id}
                  />
                );
              } else if (
                itemData.item.productName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
              ) {
                return (
                  <AllProductsCard
                    productName={itemData.item.productName}
                    price={itemData.item.price}
                    details={itemData.item.details}
                    type={itemData.item.type}
                    image={itemData.item.image}
                    id={itemData.item.id}
                  />
                );
              }
            }
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLOURS.backgroundMedium,
    width: 110,
    height: 35,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: COLOURS.black,
    fontWeight: "700",
    fontSize: 16,
    padding: 5,
  },
});
