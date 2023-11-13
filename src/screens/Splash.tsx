import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { Image } from "react-native";
const Splash = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image style={styles.logo} source={require("../../assets/logo.png")} />
      </View>
    </SafeAreaView>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
});
