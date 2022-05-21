import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { addUser } from "../models/user";
import Entypo from "react-native-vector-icons/Entypo";
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { COLOURS } from "./constants";
import { register, getUserUId } from "../models/auth";

const SignupScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const navigation = useNavigation();

  function registerUser() {
    console.log("this is email ", email);
    if ((email === "", password === "", name === "", phoneNumber === "")) {
      alert("email or password is empty!");
    } else {
      register(email, password)
        .then(() => {
          console.log(getUserUId());
          getUserUId().then((id) => {
            // console.log(id);
            addUser({
              id: id,
              email,
              password,
              name,
              phoneNumber,
              address,
              Role: "User",
              image:
                "https://64.media.tumblr.com/d82d24956974272dff1f745a004a43bf/tumblr_o51oavbMDx1ugpbmuo3_540.png",
            });
          });
          navigation.navigate("Login");
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
  }
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //     }
  //   });
  // }, []);

  // const handleSignUp = async () => {
  //     await createUserWithEmailAndPassword(
  //        authentication,email,password,name, usename,confirmpassword,city,state,gender,age,phone
  //     )
  //     .then(() => {
  //       // addUser({
  //       //   email: email,
  //       //   image:
  //       //     "https://www.google.com/url?sa=i&url=https%3A%2F%2Fminervastrategies.com%2Fwho-we-are%2Fdefault-avatar%2F&psig=AOvVaw1aKizKN9D2p6bkk4w1AFa3&ust=1653148665392000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJjO3eu47vcCFQAAAAAdAAAAABAI",
  //       //   name: name,
  //       //   phoneNumber: phoneNumber,
  //       //   address: address,
  //       //   id : id
  //       // });
  //       getUserUId().then((id) => {
  //         // console.log(id);
  //         addUser({
  //           email: email,
  //           image:
  //             "https://www.google.com/url?sa=i&url=https%3A%2F%2Fminervastrategies.com%2Fwho-we-are%2Fdefault-avatar%2F&psig=AOvVaw1aKizKN9D2p6bkk4w1AFa3&ust=1653148665392000&source=images&cd=vfe&ved=0CAwQjRxqFwoTCJjO3eu47vcCFQAAAAAdAAAAABAI",
  //           name: name,
  //           phoneNumber: phoneNumber,
  //           address: address,
  //           id: id,
  //         });
  //       });
  //     })
  //     .catch((error) => alert(error.massage));
  // };
  // async function register(
  //   email,
  //   password,
  //   name,
  //   image,
  //   phone
  // ) {
  //   await createUserWithEmailAndPassword(
  //     authentication,
  //     email,
  //     password,
  //     name,
  //     usename,
  //     phone
  //   );
  // }

  return (
    <View style={styles.container} behavior={"padding"}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
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
              navigation.navigate("Login");
            }}
          />
        </TouchableOpacity>
      </View>
      <Image style={styles.image} source={require("../SeTronics.png")} />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="PhoneNumber"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Address"
          value={address}
          onChangeText={(text) => setAddress(text)}
          style={styles.input}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            registerUser();
          }}
          style={[styles.button, , styles.buttonOutline]}
        >
          <Text style={[styles.buttonOutlineText]}>SignUp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  image: {
    width: 250,
    height: 250,
  },
});
