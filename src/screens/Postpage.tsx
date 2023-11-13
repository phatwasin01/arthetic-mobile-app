import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Avatar } from "@rneui/base";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Post from "../components/post/Post";
const HeaderMain = () => (
  <View style={styles.headerContainer}>
    <AntDesign name="arrowleft" size={24} color="black" />
  </View>
);

const PostComment = ({
  caption,
  username,
  isUserLiked,
  isUserRePosted,
}: {
  caption: string;
  username: string;
  isUserLiked: boolean;
  isUserRePosted: boolean;
}) => (
  <View style={styles.CommentOverall}>
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
  </View>
);

export default function PostPage() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <HeaderMain />
        <ScrollView style={{ width: "100%" }}>
          <PostComment
            key={1}
            caption={"Hello2"}
            username={"Angel"}
            isUserLiked={true}
            isUserRePosted={false}
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  headerContainer: {
    borderColor: "#E5E5E5",
    borderBottomWidth: 1,
    width: "100%",
    height: "7.11%",
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 150,
    paddingHorizontal: 15,
  },
  logo: {
    height: 29,
    width: 29.5,
  },
  headerText: {
    fontSize: 16,
  },
  postContainer: {
    width: "100%",
    height: "46.2%",
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
    borderColor: "#E5E5E5",
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 17,
    borderBottomColor: "#E5E5E5",
  },
  CommentOverall: {
    borderColor: "#E5E5E5",
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 17,
    paddingBottom: 17,
    borderBottomColor: "#E5E5E5",
  },
  postPic: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  boldText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
