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
import React, { useState, useEffect, useContext } from "react";
import { auth } from "../firebase";
import { useNavigation } from "@react-navigation/core";
import { COLOURS } from "./constants";
import { login, getUserToken } from "../models/auth";
import { AuthContext } from "./utils";

const LoginScreen = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = useContext(AuthContext);
  function signInUser() {
    login(email, password)
      .then(() => {
        console.log(email, password);
        console.log("here sign in*");
        navigation.navigate("Home");
      })
      .catch((e) => {
        alert("invalid email or password");
        console.log(e.message);
      });
  }
  const navigation = useNavigation();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //     }
  //   });
  // }, []);

  // const handleSignUp = () => {
  //   navigation.navigate("Products");
  // };

  // const handleLogin = async () => {
  //   await signInWithEmailAndPassword(auth, email, password)
  //     .then(() => {
  //       navigation.navigate("Home");
  //     })
  //     .catch((error) => alert(error.massage));
  // };

  // const handleForget = async () => {
  //   await sendPasswordResetEmail(auth, email)
  //     .then(() => {
  //       console.log("okekekek");
  //     })
  //     .catch((error) => alert(error.massage));
  // };

  return (
    <View style={styles.container} behavior={"padding"}>
      <Image style={styles.image} source={require("../SeTronics.png")} />
      <View style={styles.inputContainer}>
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
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            signInUser();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>LogIn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
          style={[styles.button, , styles.buttonOutline]}
        >
          <Text style={[styles.buttonOutlineText]}>SignUp</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleForget();
          }}
          style={[styles.button, , styles.buttonOutline]}
        >
          <Text style={[styles.buttonOutlineText]}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

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
