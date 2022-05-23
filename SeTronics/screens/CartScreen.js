import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  ScrollView,
  FlatList,
} from "react-native";
import { signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
// import {cartItems} from "../reducers/cartItems"
import { useNavigation } from "@react-navigation/core";
import { async } from "@firebase/util";
import { COLOURS } from "./constants";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ProductCard from "../componants/ProductCard";
import BundleCard from "../componants/BundleCard";
import { auth } from "../firebase";
import {
  getUserUId,
  addUser,
  deleteUser,
  editUser,
  getUserById,
  getUserByName,
  getUsers,
  subscribeUser,
} from "../models/user";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getProductByID,
  getProductByName,
  getProducts,
  subscribeProduct,
} from "../models/products";

import {
  addbundle,
  deletebundle,
  editbundle,
  getBundleByID,
  getBundleByName,
  getbundles,
  subscribebundle,
} from "../models/bundle";
import AllProductsCard from "../componants/AllProductsCard";
import { addOrder } from "../models/order";
import AllBundlesCard from "../componants/AllBundlesCard";
import BCART from "../componants/BCART";
import PCART from "../componants/PCART";

const CartScreen = ({ route }) => {
  const navigation = useNavigation();
  // const {id} = route.params;
  const [product, setProduct] = useState();
  const [total, setTotal] = useState(0);
  //for user profile
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [userCart, setUserCart] = useState([]);
  const [user, setUser] = useState();
  const [ProductInCart, setProductInCart] = useState();

  useEffect(() => {
    (async () => {
      let ar = [];
      let prod;
      for (let i = 0; i < userCart.length; i++) {
        if (await getProductByID(userCart[i])) {
          prod = await getProductByID(userCart[i]);
          ar.push(prod);
        } else {
          prod = await getBundleByID(userCart[i]);
          ar.push(prod);
        }
        setTotal(total + prod.price);
      }
      console.log(prod);
      // console.log(ar);
      setProductInCart(ar);
    })();
  }, [userCart]);
  useEffect(() => {
    getUserUId().then((id) => {
      console.log(id);
      getUserById(id).then((user) => {
        user.forEach((user) => {
          console.log("first elemet is ", user);
          console.log("cart is ", user.cart);

          setUserCart(user.cart);
          setUser(user);
          console.log(userCart.length);
        });
      });
    });
  }, []);

  const handleDelete = async () => {
    const arr = await getUsers();
    const currentUser = arr.find((e) => e.email === auth.currentUser.email);
    const userCart = currentUser.cart;
    userCart = userCart.filter((e) => e !== id);
    editUser({
      ...currentUser,
      cart: [...userCart],
    });
  };

  const handleCheckOut = () => {
    addOrder({ user: auth.currentUser.email, ProductInCart }).then(() => {
      editUser({
        ...user,
        cart: [],
      });
    });
    alert("Order Sent");
  };
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white,
        position: "relative",
      }}
    >
      <ScrollView>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            paddingTop: 16,
            paddingHorizontal: "16",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <MaterialCommunityIcons
              name="chevron-left"
              style={{
                fontSize: 18,
                color: COLOURS.backgroundDark,
                padding: 12,
                backgroundColor: COLOURS.backgroundLight,
                borderRadius: 12,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.black,
              fontWeight: "400",
            }}
          >
            Order Details
          </Text>
          <View></View>
        </View>
        <Text
          style={{
            fontSize: 20,
            color: COLOURS.black,
            fontWeight: "500",
            letterSpacing: 1,
            paddingTop: 20,
            paddingLeft: 16,
            marginBottom: 10,
          }}
        >
          My cart
        </Text>
        <View style={{ paddingHorizontal: 16 }}>
          <FlatList
            data={ProductInCart}
            horizontal={false}
            renderItem={(itemData) => {
              if (itemData.item.Type === "Bundle") {
                return (
                  <BCART
                    bundleName={itemData.item.bundleName}
                    price={itemData.item.price}
                    specs={itemData.item.specs}
                    Type={itemData.item.Type}
                    image={itemData.item.image}
                    id={itemData.item.id}
                  />
                );
              }
              return (
                <PCART
                  productName={itemData.item.productName}
                  price={itemData.item.price}
                  details={itemData.item.details}
                  type={itemData.item.type}
                  image={itemData.item.image}
                  id={itemData.item.id}
                />
              );
            }}
          ></FlatList>
        </View>
        <View>
          <View
            style={{
              paddingHorizontal: 16,
              marginVertical: 10,
            }}
          ></View>
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 40,
              marginBottom: 80,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: COLOURS.black,
                fontWeight: "500",
                letterSpacing: 1,
                marginBottom: 20,
              }}
            >
              Order Info
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              {/* Here the the order type here */}

              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  maxWidth: "80%",
                  color: COLOURS.black,
                  opacity: 0.5,
                }}
              >
                Subtotal
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  color: COLOURS.black,
                  opacity: 0.8,
                }}
              >
                {total} EGP
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 22,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  maxWidth: "80%",
                  color: COLOURS.black,
                  opacity: 0.5,
                }}
              >
                Shipping Tax
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  color: COLOURS.black,
                  opacity: 0.8,
                }}
              >
                {total / 20} EGP
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "400",
                  maxWidth: "80%",
                  color: COLOURS.black,
                  opacity: 0.5,
                }}
              >
                Total Payment
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "500",
                  color: COLOURS.black,
                }}
              >
                {total + total / 20} EGP
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 10,
          height: "15%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => (total != 0 ? handleCheckOut() : null)}
          style={{
            width: "90%",
            height: "40%",
            backgroundColor: COLOURS.blue,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              fontWeight: "500",
              letterSpacing: 1,
              color: COLOURS.white,
              textTransform: "uppercase",
            }}
          >
            CHECKOUT ({total + total / 20}) EGP
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartScreen;
