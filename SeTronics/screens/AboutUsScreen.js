import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Button,
} from "react-native";
import React from "react";
import { Linking } from "react-native";
import { COLOURS } from "./constants";
import { useNavigation } from "@react-navigation/core";
import Entypo from "react-native-vector-icons/Entypo";
const AboutUsScreen = () => {
  const navigation = useNavigation();
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
            navigation.navigate("Profile");
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
        <View style={{ flexDirection: "row" }}>
          <Image
            style={styles.userImg}
            source={{
              uri: "https://i.ibb.co/R4rKMd6/IMG-20211202-173600.jpg",
            }}
          />
          <Image
            style={styles.userImg}
            source={{
              uri: "https://scontent.fcai19-4.fna.fbcdn.net/v/t39.30808-6/275360723_1408917832855006_5894021224660211644_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=P-g2gZR_mRwAX-PHkmi&_nc_ht=scontent.fcai19-4.fna&oh=00_AT-PEcAyDHfgTK1GztYx8PMRNuevaPrWIc0LYolC0pLb4g&oe=628C9592",
            }}
          />
          <Image
            style={styles.userImg}
            source={{
              uri: "https://i.ibb.co/G0nccNr/278568775-7310624385679087-8064140798913309233-n.jpg",
            }}
          />
        </View>
        <View style={{ marginTop: 50 }}>
          <Text>
            We are three students in Faculty Of Science Cairo University
            {"\n"}Our names are Youssef Adel , Abdelatef Mostafa , Baher Sami
            {"\n"}This project is a design and implementation for an ecommerce
            application
          </Text>
        </View>
        <View style={{ marginTop: 30 }}>
          <View style={{ alignItems: "center" }}>
            <Text>You can connect with us on gmail</Text>
            <Text>firstly Youssef Adel's Email</Text>
            <Button
              onPress={() =>
                Linking.openURL("mailto:youssefadel22022@gmail.com")
              }
              title="youssefadel22022@gmail.com"
            />
          </View>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text>You can connect with us on gmail</Text>
            <Text>Secondly Baher Sami's Email</Text>
            <Button
              onPress={() => Linking.openURL("mailto:bahersami1907@gmail.com")}
              title="bahersami1907@gmail.com"
            />
          </View>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Text>You can connect with us on gmail</Text>
            <Text>thirdly Abdelatef Mostafa's Email</Text>
            <Button
              onPress={() =>
                Linking.openURL("mailto:youssefadel22022@gmail.com")
              }
              title="youssefadel22022@gmail.com"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AboutUsScreen;

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
});
