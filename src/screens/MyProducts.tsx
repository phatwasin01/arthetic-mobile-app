import { StyleSheet, Text, View, Switch, SafeAreaView } from "react-native";
import React from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { HeaderGoback } from "../components/navigation/HeaderGoback";
import { Image } from "@rneui/base";
import {
  GetMyProducts,
  SoftDeleteProductById,
  UnDeleteProductById,
} from "../gql/document";
import { useQuery, useMutation } from "@apollo/client";
import { FlatList } from "react-native-gesture-handler";
import { priceToString } from "../utils/product";

const StatusBadge = ({ isSold }: { isSold: boolean }) => {
  if (isSold) {
    return (
      <View
        style={{
          borderRadius: 5,
          backgroundColor: "#FF473E",
          paddingHorizontal: 7,
          paddingVertical: 2,
          alignSelf: "flex-start",
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
          Sold
        </Text>
      </View>
    );
  }
  return (
    <View
      style={{
        borderRadius: 5,
        backgroundColor: "#00B89C",
        paddingHorizontal: 7,
        paddingVertical: 2,
        alignSelf: "flex-start",
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
        Available
      </Text>
    </View>
  );
};
const MarketManage = ({
  navigation,
}: {
  navigation: StackNavigationProp<any>;
}) => {
  const {
    data,
    loading,
    error,
    refetch: refetchMyProducts,
  } = useQuery(GetMyProducts);
  const [softDeleteProductById] = useMutation(SoftDeleteProductById);
  const [undeleteProductById] = useMutation(UnDeleteProductById);

  const handleDeleteToggle = async (id: string, isCurrentDeleted: boolean) => {
    try {
      if (isCurrentDeleted) {
        await undeleteProductById({ variables: { unDeleteProductId: id } });
      } else {
        await softDeleteProductById({ variables: { deleteProductId: id } });
      }
    } catch (e) {
      console.log("toggle conflict, might going too fast");
    }
    await refetchMyProducts();
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <SafeAreaView style={styles.container}>
        <HeaderGoback navigation={navigation} />
        <FlatList
          data={data?.myProducts}
          renderItem={({ item }) => (
            <View style={[styles.productCard, styles.shadowProp]}>
              <View style={styles.detailnpicContainer}>
                <Image
                  style={styles.product}
                  source={{ uri: item.imageUrl || undefined }}
                />
                <View style={styles.productDetail}>
                  <Text style={{ fontWeight: "600", fontSize: 16 }}>
                    {item.name}
                  </Text>
                  <Text style={{ fontWeight: "600", fontSize: 16 }}>
                    {priceToString(item.price)}฿
                  </Text>
                  <StatusBadge isSold={item.isSold || false} />
                </View>
              </View>
              <View style={styles.accessPoint}>
                <Switch
                  value={!item.isDeleted || false}
                  onValueChange={async () => {
                    if (
                      item.isDeleted != undefined &&
                      item.isDeleted !== null
                    ) {
                      await handleDeleteToggle(item.id, item.isDeleted);
                    }
                  }}
                />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
};

export default MarketManage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  product: {
    display: "flex",
    width: 72,
    height: 72,
    borderRadius: 5,
  },
  productCard: {
    display: "flex",
    marginHorizontal: 10,
    padding: 15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 15,
    backgroundColor: "#FFFFFF",
    marginTop: 20,
  },
  productDetail: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 8,
  },
  accessPoint: {
    display: "flex",
    height: "95%",
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  detailnpicContainer: {
    display: "flex",
    alignItems: "flex-start",
    gap: 16,
    flexDirection: "row",
  },
  cardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 26,
  },
  switchStyle: {
    width: 40,
    height: 20,
  },
  underline: {
    textDecorationLine: "underline",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
