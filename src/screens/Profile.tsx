import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState } from "react";
import { deleteValueFromSecureStore, logoutNavigate } from "../utils/auth";
import { Avatar } from "@rneui/base";
import { StackNavigationProp } from "@react-navigation/stack";
import Octicons from "@expo/vector-icons/Octicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";
import { GetUserProfile } from "../gql/document";
import { useQuery } from "@apollo/client";
import Loading from "./Loading";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FromNow } from "../utils/post";
const userTokenKey = "userToken";

const HeaderMain = () => (
  <View style={styles.headerContainer}>
    <View style={styles.headerLeft}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      <Text style={styles.headerText}>Arthetic</Text>
    </View>
  </View>
);

const Profile = ({ navigation }: { navigation: StackNavigationProp<any> }) => {
  const {
    data,
    loading,
    error,
    refetch: refetchProfile,
  } = useQuery(GetUserProfile);
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);

    await refetchProfile();

    setRefreshing(false);
  };
  const navigateToPost = (postId: string | undefined) => {
    if (!postId) return;
    navigation.navigate("PostPage", { postId });
  };
  if (error) {
    return <Text>Error</Text>;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <SafeAreaView style={styles.container}>
        <HeaderMain />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View style={styles.profDetailContainer}>
            <Avatar
              rounded
              size="large"
              source={{ uri: data?.userProfile?.imageUrl || undefined }}
            />
            <View style={styles.detailContainer}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {data?.userProfile?.posts?.length}
              </Text>
              <Text>Posts</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {data?.userProfile?.followers?.length}
              </Text>
              <Text>Follower</Text>
            </View>
            <View style={styles.detailContainer}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {data?.userProfile?.following?.length}
              </Text>
              <Text>Following</Text>
            </View>
          </View>
          <View style={styles.bioContainer}>
            <Text style={{ fontSize: 18 }}>{data?.userProfile?.username}</Text>
            {/* <Text> SIIT29 | Digital Engineering </Text> */}
          </View>
          <View style={styles.buttoncontainer}>
            {/* <TouchableOpacity style={styles.profButton}>
              <Text style={styles.profBTfont}>Follow</Text>
            </TouchableOpacity> */}
            {/* <TouchableOpacity style={styles.profButton}>
            <Text style={styles.profBTfont}>Message</Text>
          </TouchableOpacity> */}
            <TouchableOpacity
              style={styles.profButton}
              onPress={() => {
                deleteValueFromSecureStore(userTokenKey);
                logoutNavigate(navigation);
              }}
            >
              <Text style={styles.profBTfont}>Logout</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.underline} />
          {data?.userProfile?.posts?.map((post, index) => (
            // <Text>{post?.content}</Text>
            <TouchableOpacity
              style={styles.postOverall}
              key={index}
              activeOpacity={1}
              onPress={() => navigateToPost(post?.id)}
            >
              {post?.postType === "Repost" && (
                <View style={styles.repostHeader}>
                  <FontAwesome name="retweet" size={18} color="#B1B1B1" />
                  <Text style={{ color: "#B1B1B1", fontWeight: "600" }}>
                    You reposted
                  </Text>
                </View>
              )}
              <View style={styles.postHeader}>
                <Avatar
                  rounded
                  size={37}
                  source={{
                    uri: post?.author?.imageUrl || undefined,
                  }}
                  onPress={() => console.log("Works!")}
                />
                <View style={styles.postCaption}>
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.boldText}>
                      {post?.author?.username}
                    </Text>
                    <Text style={styles.timestamp}>
                      {FromNow(post?.timestamp || "")}
                    </Text>
                  </View>
                  <Text>{post?.content}</Text>
                </View>
              </View>
              {post?.imageUrl && (
                <Image
                  source={{
                    uri: post?.imageUrl || undefined,
                  }}
                  style={{
                    width: 280,
                    height: 280,
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                />
              )}
              <View style={styles.postCalltoAction}>
                <FontAwesome name="comment" size={18} color="#B1B1B1" />
                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <FontAwesome
                    name="retweet"
                    size={18}
                    color={post?.isUserReposted ? "#1DC560" : "#B1B1B1"}
                  />
                  <Text style={styles.actionCounts}>{post?.repostCount}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <FontAwesome
                    name="heart"
                    size={18}
                    color={post?.isUserLiked ? "#FF6464" : "#B1B1B1"}
                  />
                  <Text style={styles.actionCounts}>{post?.likeCount}</Text>
                </TouchableOpacity>

                <FontAwesome name="share" size={18} color="#B1B1B1" />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  profNum: {},
  profDetail: {},
  profButton: {
    display: "flex",
    flex: 3,
    backgroundColor: "#ececec",
    borderRadius: 5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  profBTfont: {
    color: "#2d2d2d",
    fontSize: 12,
  },
  buttoncontainer: {
    width: "100%",
    paddingHorizontal: 40,
    gap: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  bioContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    width: "100%",
    paddingHorizontal: 40,
    paddingBottom: 20,
    justifyContent: "flex-start",
  },
  profDetailContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    paddingTop: 20,
    paddingBottom: 20,
  },
  detailContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  headerProfContainer: {
    width: "100%",
  },
  headerContainer: {
    borderColor: "#E5E5E5",
    borderBottomWidth: 1,
    width: "100%",
    height: "7.11%",
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
  postOverall: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 17,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
  },
  repostHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 40,
    paddingVertical: 10,
    width: "100%",
    gap: 10,
    marginTop: -17,
  },
  postHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    marginLeft: 11,
  },
  postCaption: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    marginLeft: 15,
    marginRight: 11,
    // borderWidth: 1,
  },
  boldText: {
    fontSize: 16,
    fontWeight: "600",
  },
  timestamp: {
    fontSize: 14,
    color: "#B1B1B1",
    fontWeight: "400",
  },
  postCalltoAction: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    gap: 60,
    paddingVertical: 16,
  },
  actionCounts: {
    fontSize: 14,
    color: "#B1B1B1",
    fontWeight: "500",
    marginLeft: 5,
  },
  underline: {
    borderBottomWidth: 1,
    marginTop: 15,
    borderColor: "#B1B1B1",
  },
});
