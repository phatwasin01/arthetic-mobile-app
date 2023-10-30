import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Avatar } from "@rneui/base";
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
import AdBanner from "../components/carousel/Carousel";

import { GetUserFollowingFeed } from "../gql/document";
import { useQuery } from "@apollo/client";
import { deleteValueFromSecureStoreAndLogout } from "../utils/auth";
import { StackNavigationProp } from "@react-navigation/stack";

const userTokenKey = "userToken";
const HeaderMain = () => (
  <View style={styles.headerContainer}>
    <View style={styles.headerLeft}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      <Text style={styles.headerText}>Arthetic</Text>
    </View>
    <View style={styles.headerRight}>
      <Octicons name="paintbrush" size={24} color="black" />
      <AntDesign name="message1" size={24} color="black" />
    </View>
  </View>
);

const PostFeed = ({
  caption,
  username,
}: {
  caption: string;
  username: string;
}) => (
  <View style={styles.postOverall}>
    <View style={styles.postHeader}>
      <Avatar
        rounded
        size={37}
        source={{
          uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
        }}
      />
      <View style={styles.postCaption}>
        <Text style={styles.boldText}>{username}</Text>
        <Text>{caption}</Text>
      </View>
    </View>
    <Image
      source={require("../../assets/PostImage.jpeg")}
      style={{ width: 280, height: 280, borderRadius: 10, marginTop: 10 }}
    />
    <View style={styles.postCalltoAction}>
      <FontAwesome name="comment" size={18} color="#B1B1B1" />
      <FontAwesome name="retweet" size={18} color="#B1B1B1" />
      <FontAwesome name="heart" size={18} color="#B1B1B1" />
      <FontAwesome name="bookmark" size={18} color="#B1B1B1" />
      <FontAwesome name="share" size={18} color="#B1B1B1" />
    </View>
  </View>
);

export default function HomePage({
  navigation,
}: {
  navigation: StackNavigationProp<any>;
}) {
  const { data, loading, error } = useQuery(GetUserFollowingFeed);
  if (loading) return <Text>Loading...</Text>;
  // TODO: Handle error properly
  if (error) {
    deleteValueFromSecureStoreAndLogout(userTokenKey, navigation);
  }
  if (!data) return <Text>No Data</Text>;
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <SafeAreaView style={styles.container}>
        <HeaderMain />
        <ScrollView style={{ width: "100%" }}>
          <AdBanner />
          {data?.userProfile?.followingFeed?.map((post, index) => (
            <PostFeed
              key={index}
              caption={post?.content || ""}
              username={post?.author?.username || ""}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  bannerImage: {
    width: 310,
    height: 130,
    borderRadius: 5,
  },
  bannerinnerContainer: {
    display: "flex",
    paddingVertical: 14,
    alignItems: "flex-start",
    gap: 14,
    flexDirection: "row",
    marginLeft: -285,
  },
  bannerouterContainer: {
    borderColor: "#E5E5E5",
    borderWidth: 1,
    display: "flex",
    width: 390,
    height: 130,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
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
  navContainer: {
    width: 390,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 50,
  },
  naveOuter: {
    flex: 1,
    justifyContent: "flex-end",
  },
  postContainer: {
    width: 390,
    height: 390,
    justifyContent: "center",
    alignItems: "center",
  },
  postCalltoAction: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 60,
    paddingVertical: 16,
  },
  postCaption: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    marginLeft: 15,
    marginRight: 11,
  },
  postHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 11,
  },
  postOverall: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 17,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  postPic: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  logo: {
    height: 29,
    width: 29.5,
  },
  headerText: {
    fontSize: 16,
  },
  icon: {
    height: 24,
    width: 24,
  },
  profilePic: {
    width: 37,
    height: 37,
  },
  boldText: {
    fontSize: 16,
    fontWeight: "600",
  },
  postPicContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
});
