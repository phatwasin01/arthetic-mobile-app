import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { deleteValueFromSecureStoreAndLogout } from "../utils/auth";
import { Button } from "@rneui/base";
import { StackNavigationProp } from "@react-navigation/stack";

const userTokenKey = "userToken";
const Profile = ({ navigation }: { navigation: StackNavigationProp<any> }) => {
  return (
    <View
      style={{
        backgroundColor: "#ffffff",
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <Button
        onPress={() => {
          deleteValueFromSecureStoreAndLogout(userTokenKey, navigation);
        }}
      >
        <Text>Logout</Text>
      </Button>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
