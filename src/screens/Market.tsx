import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { Octicons } from "@expo/vector-icons";
import { DiscoveryGlobalProducts } from "../gql/document";
import { useQuery } from "@apollo/client";
import Loading from "./Loading";
import { Avatar } from "@rneui/base";
import { Image } from "@rneui/base";

export default function Market({
  navigation,
}: {
  navigation: StackNavigationProp<any>;
}) {
  const {
    data: products,
    loading,
    error,
    refetch: refetchMarket,
  } = useQuery(DiscoveryGlobalProducts);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);

    await refetchMarket();

    setRefreshing(false);
  };
  if (loading || !products) return <Loading />;
  if (error) return <Text>Error</Text>;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <HeaderMain navigation={navigation} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.productsContainer}>
          {products?.discoverGlobalProducts?.map((product) => (
            <View
              style={[styles.productCard, styles.shadowProp]}
              key={product.id}
            >
              <View style={{ position: "relative" }}>
                <Image
                  style={styles.productImage}
                  source={{ uri: product.imageUrl || undefined }}
                />
                <View
                  style={{
                    borderRadius: 5,
                    backgroundColor: "#00B89C",
                    opacity: 0.8,
                    paddingHorizontal: 5,
                    paddingVertical: 1,
                    position: "absolute",
                    bottom: 5,
                    right: 5,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "600",
                      fontSize: 13,
                    }}
                  >
                    {product.price}฿
                  </Text>
                </View>
              </View>

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
                  size={32}
                  source={{
                    uri: product?.owner?.imageUrl || undefined,
                  }}
                  onPress={() => console.log("Works!")}
                />
                <View>
                  <Text style={{ fontSize: 14 }}>{product?.name}</Text>
                  <Text style={{ fontSize: 12, fontWeight: "300" }}>
                    @{product?.owner?.username}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
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
  productsContainer: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 25,
  },
  productImage: {
    width: 150,
    height: 150,
    borderRadius: 5,
  },
  productCard: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
    marginBottom: 20,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
