import { async } from "@firebase/util";
import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import Entypo from "react-native-vector-icons/Entypo";
import { auth } from "../firebase";
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import { ToastAndroid } from 'react-native-web';
import { getProductByName } from "../models/products";
import { editUser, getUserById, getUsers, getUserUId } from "../models/user";
import { COLOURS } from "./constants";

const ProductInfo = ({ route, Navigation }) => {
  const navigation = useNavigation();
  //sending all the info needed
  const {
    productName,
    price,
    image,
    details,
    type,
    bundleName,
    specs,
    Type,
    id,
  } = route.params;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const [userCart, setUserCart] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    getUserUId().then((id) => {
      console.log(id);
      getUserById(id).then((user) => {
        console.log(user);
        setEmail(user[0].email);
        setPassword(user[0].password);
        setname(user[0].name);
        setPhoneNumber(user[0].phoneNumber);
        setRole(user[0].Role);
        setUserCart(user[0].cart);
        setUser(user[0]);
      });
    });
  }, []);
  // const [cart,setCart] = useState('');
  const handleAdd = () => {
    console.log(id);
    editUser({
      ...user,
      cart: [...userCart, id],
    });
    alert("Product Added to Cart");
  };

  // const [ProductName , setProductName] = useState("")
  // const [image , setImage] = useState("")
  // const [price , setPrice] = useState("")
  // const [details , setDetails] = useState("")

  // const getData = async ()=>{
  //    const objectData =  getProductByName(object.productName);
  //    setProductName(objectData.ProductName);
  //    setImage(objectData.image);
  //     setPrice(objectData.price);
  //     setDetails(objectData.details);
  // }

  // useEffect(() => {
  //     getData();
  //   }, []);

  const handleDelete = async () => {
    // navigation.navigate("Cart");
    var userCart = user.cart;
    userCart = userCart.filter((e) => e !== id);
    console.log(id);
    console.log(userCart);
    editUser({
      ...user,
      cart: userCart,
    });
    alert("Product Deleted From Cart");
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
      {/* getting the navigation routing 
            right now we are calling the products to a view tag in the text tag as we cant display them without a text tag 
            dont forget to change the product ID as we call it differently  */}
      {/* <Text>ProductInfo(ProducctID)</Text> */}

      {/* <StatusBar
        backgroundColor={COLOURS.backgroundLight}
        barstyle="dark-content"
      /> */}
      {/* <Image source={image} /> */}

      <ScrollView>
        <View
          style={{
            width: "100%",
            backgroundColor: COLOURS.backgroundLight,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <View
            style={{
              marginRight: "90%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (Type === "Bundle") navigation.navigate("Bundles");
                else navigation.navigate("Products");
              }}
            >
              <Entypo
                name="chevron-thin-left"
                style={{
                  fontSize: 18,
                  color: COLOURS.backgroundDark,
                  padding: 12,
                  backgroundColor: COLOURS.white,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "center",
              // alignContent:"flex-start",
              paddingTop: 16,
              //   paddingLeft: 16,
            }}
          >
            <Image
              style={{
                height: 500,
                width: "75%",
                justifyContent: "center",
                alignItems: "center",
              }}
              source={image}
            />
          </View>

          {/*//the flat list tag is used to make the render faster as the displayed items are the only displayed or rendered others will be rendered when they are scrolled  */}
          {/* <Image source={}/> */}
          <Image source={require("../SeTronics.png")} />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              marginTop: 32,
            }}
          ></View>
          {/* right here we fill the product page as the previous code was about to make the product image and the scroll over the multi images products and now we are filling the actual info about the product */}
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 6,
            }}
          >
            {/* <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginVertical: 14,
              }}
            >
              <Entypo
                name="shopping cart"
                style={{
                  fontSize: 18,
                  color: COLOURS.blue,
                  marginRight: 6,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.black,
                }}
              >
                shopping
              </Text>
            </View> */}
            <View
              style={{
                flexDirection: "row",
                marginVertical: 4,
              }}
            >
              {/* we generate the product name as it differ from a product page to another  */}
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "600",
                  letterSpacing: 0.5,
                  marginVertical: 4,
                  color: COLOURS.black,
                  maxWidth: "84%",
                }}
              >
                {productName}
                {bundleName}
              </Text>
            </View>
            <Text
              style={{
                fontSize: 12,
                color: COLOURS.black,
                fontWeight: "400",
                letterSpacing: 1,
                opacity: 0.5,
                lineHeight: 20,
                maxWidth: "85%",
                maxHeight: 44,
                marginBottom: 18,
              }}
            >
              {/* change the word description wit hthe word that you name it as the description for each product in the database */}
              {details}
              {specs}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginVertical: 14,
                borderBottomColor: COLOURS.backgroundLight,
                borderBottomWidth: 1,
                paddingBottom: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "80%",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    color: COLOURS.blue,
                    backgroundColor: COLOURS.backgroundLight,
                    alignItems: "center",
                    padding: 12,
                    borderRaduis: 100,
                    marginRight: 10,
                  }}
                ></View>
              </View>
            </View>
          </View>
          {/* the price of the prdouct with the currency sign  */}
          <View
            style={{
              paddingHorizontal: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: 500,
                maxWidth: "100%",
                color: COLOURS.black,
                marginBottom: 4,
                justifyContent: "flex-start",
              }}
            >
              Price: {price} EGP
            </Text>
            {/* this one is opptional we can make it the delivery taxes or any fuckin thing */}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: "relative",
          bottom: 10,
          height: "8%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* this once to be avilable to the customer to add the product to the cart to procced the sale or it tells the customer that out of stock  */}
        <TouchableOpacity
          // onPress={()=> {/** addToCart(product.id)} */}
          onPress={() => {
            handleAdd();
          }}
          style={{
            width: "86%",
            height: "90%",
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
            {"Add to cart"}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          position: "relative",
          bottom: 10,
          height: "8%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* this once to be avilable to the customer to add the product to the cart to procced the sale or it tells the customer that out of stock  */}
        <TouchableOpacity
          // onPress={()=> {/** addToCart(product.id)} */}
          onPress={() => handleDelete()}
          style={{
            width: "86%",
            height: "90%",
            backgroundColor: COLOURS.red,
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
            {"Remove from cart"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductInfo;
