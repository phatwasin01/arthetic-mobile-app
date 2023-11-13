import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { Octicons, AntDesign } from "@expo/vector-icons";
export default function Market({
  navigation,
}: {
  navigation: StackNavigationProp<any>;
}) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderMain navigation={navigation} />
    </SafeAreaView>
  );
}
const HeaderMain = ({
  navigation,
}: {
  navigation: StackNavigationProp<any>;
}) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerLeft}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      <Text style={styles.headerText}>Marketplace</Text>
    </View>
    <View style={styles.headerRight}>
      <Octicons
        name="paintbrush"
        size={28}
        color="black"
        onPress={() => navigation.navigate("CreateArt")}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    borderColor: "#E5E5E5",
    borderBottomWidth: 1,
    width: "100%",
    height: 60,
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 150,
    paddingHorizontal: 15,
  },
  headerLeft: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  logo: {
    height: 29,
    width: 29.5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2D2D2D",
  },
});
