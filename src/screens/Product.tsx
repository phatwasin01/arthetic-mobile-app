import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { HeaderGoback } from "../components/navigation/HeaderGoback";
import { Avatar, Image } from "@rneui/base";
import { GetProductById } from "../gql/document";
import { useQuery } from "@apollo/client";
import Loading from "./Loading";
import { Dimensions } from "react-native";
import { priceToString } from "../utils/product";
import { navigateToUserProfile } from "../utils/user";
const windowWidth = Dimensions.get("window").width * 0.9;
export default function Product({
  route,
  navigation,
}: {
  route: any;
  navigation: StackNavigationProp<any>;
}) {
  const { productId } = route.params;
  const { data, loading, error } = useQuery(GetProductById, {
    variables: { productId },
  });
  if (loading) return <Loading />;
  if (error) return <Text>Error</Text>;
  if (!data) return <Text>No data</Text>;
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <HeaderGoback navigation={navigation} />
      <ScrollView style={{ padding: 25 }}>
        <View style={[styles.container, styles.shadowProp]}>
          <Image
            style={{
              width: windowWidth,
              height: windowWidth,
              borderRadius: 10,
            }}
            source={{ uri: data?.product?.imageUrl || undefined }}
          />
        </View>
        <View style={{ marginBottom: 70 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              marginTop: 10,
            }}
          >
            {data?.product?.name}
          </Text>
          <View
            style={{
              borderRadius: 5,
              backgroundColor: "#00B89C",
              paddingHorizontal: 7,
              paddingVertical: 2,
              alignSelf: "flex-start",
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              {priceToString(data.product?.price)}฿
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              marginTop: 15,
              borderColor: "#B1B1B1",
            }}
          ></View>
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "500" }}>
            Category
          </Text>
          <View
            style={{
              borderRadius: 5,
              backgroundColor: "#528DE7",
              paddingHorizontal: 7,
              paddingVertical: 2,
              alignSelf: "flex-start",
              marginTop: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              {data?.product?.category?.name}
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              marginTop: 15,
              borderColor: "#B1B1B1",
            }}
          ></View>
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "500" }}>
            Description
          </Text>
          <Text style={{ marginTop: 5, fontSize: 16, fontWeight: "400" }}>
            {data?.product?.description}
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              marginTop: 15,
              borderColor: "#B1B1B1",
            }}
          ></View>
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "500" }}>
            Seller
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 10,
              marginTop: 10,
            }}
          >
            <Avatar
              rounded
              size={40}
              source={{
                uri: data.product?.owner?.imageUrl || undefined,
              }}
              onPress={() => {
                if (data.product?.owner?.username) {
                  navigateToUserProfile({
                    navigation,
                    username: data.product?.owner?.username,
                  });
                }
              }}
            />
            <View>
              <Text style={{ fontSize: 18, fontWeight: "400" }}>
                @{data.product?.owner?.username}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
