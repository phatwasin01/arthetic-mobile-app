import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native";
import { Avatar } from "@rneui/base";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ScrollView } from "react-native-gesture-handler";
import AdBanner from "../components/carousel/Carousel";
import Loading from "./Loading";
import { Image } from "@rneui/base";

import {
  GetUserFollowingFeed,
  LikePost,
  RepostPost,
  UnLikePost,
} from "../gql/document";
import { useMutation, useQuery } from "@apollo/client";

import { deleteValueFromSecureStoreAndLogout } from "../utils/auth";
import { StackNavigationProp } from "@react-navigation/stack";
import { FromNow } from "../utils/post";
const userTokenKey = "userToken";

const HeaderMain = ({
  navigation,
}: {
  navigation: StackNavigationProp<any>;
}) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerLeft}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      <Text style={styles.headerText}>Arthetic</Text>
    </View>
    <View style={styles.headerRight}>
      <AntDesign
        name="pluscircleo"
        size={28}
        color="black"
        onPress={() => navigation.navigate("CreatePost")}
      />
      {/* <AntDesign name="message1" size={24} color="black" /> */}
    </View>
  </View>
);

export default function HomePage({
  navigation,
}: {
  navigation: StackNavigationProp<any>;
}) {
  const {
    data,
    loading,
    error,
    refetch: refetchFeed,
  } = useQuery(GetUserFollowingFeed, {
    fetchPolicy: "network-only",
  });
  const [likePost, { loading: likePostLoading }] = useMutation(LikePost);
  const [unlikePost, { loading: unlikePostLoading }] = useMutation(UnLikePost);
  const [repostPost, { loading: repostPostLoading }] = useMutation(RepostPost);
  const [refreshing, setRefreshing] = useState(false);
  console.log(data);
  const onRefresh = async () => {
    setRefreshing(true);

    await refetchFeed();

    setRefreshing(false);
  };
  const handleLike = async (
    postId: string | undefined,
    isUserLiked: boolean | undefined | null
  ) => {
    if (!postId || likePostLoading || unlikePostLoading) return;
    if (isUserLiked === true) {
      await unlikePost({
        variables: { postId },
      });
    } else if (isUserLiked === false) {
      await likePost({
        variables: { postId },
      });
    } else {
      await refetchFeed();
      return;
    }
    await refetchFeed();
  };
  const handleRepost = async (
    postId: string | undefined,
    isUserReposted: boolean | undefined | null
  ) => {
    if (!postId || repostPostLoading || isUserReposted) return;
    Alert.alert("Repost", "Are you sure you want to repost this post?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          if (isUserReposted === false && postId) {
            await repostPost({
              variables: { postId },
            });
          }
          await refetchFeed();
        },
      },
    ]);
  };
  const navigateToPost = (postId: string | undefined) => {
    if (!postId) return;
    navigation.navigate("PostPage", { postId });
  };
  if (loading) return <Loading />;
  // TODO: Handle error properly
  if (error) {
    deleteValueFromSecureStoreAndLogout(userTokenKey, navigation);
  }
  if (!data) return <Text>No Data</Text>;
  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <HeaderMain navigation={navigation} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ minHeight: "100%" }}>
          <AdBanner />
          {data.userProfile?.followingFeed?.map((post, index) => (
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
                    {post.repostUser?.username} reposted
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
                  onPress={async () => {
                    await handleRepost(post?.id, post?.isUserReposted);
                  }}
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
                  onPress={async () =>
                    await handleLike(post?.id, post?.isUserLiked)
                  }
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
        </View>
      </ScrollView>
    </SafeAreaView>
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
    // borderWidth: 1,
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
    fontSize: 24,
    fontWeight: "700",
    color: "#2D2D2D",
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
  timestamp: {
    fontSize: 14,
    color: "#B1B1B1",
    fontWeight: "400",
  },
  actionCounts: {
    fontSize: 14,
    color: "#B1B1B1",
    fontWeight: "500",
    marginLeft: 5,
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
    // borderWidth: 1,
  },
});
