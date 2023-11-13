import { Avatar } from "@rneui/base";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  RefreshControl,
  Alert,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  GetPost,
  LikePost,
  UnLikePost,
  RepostPost,
  CommentPost,
} from "../../gql/document";
import { useQuery, useMutation } from "@apollo/client";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TimestampToDate, FromNow } from "../../utils/post";
import { ScrollView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import Loading from "../../screens/Loading";
import { Image } from "@rneui/base";

export default function Post({
  route,
  navigation,
}: {
  route: any;
  navigation: StackNavigationProp<any>;
}) {
  const { postId } = route.params;
  const { data, loading, error, refetch } = useQuery(GetPost, {
    variables: { postId },
  });
  const [likePost, { loading: likePostLoading }] = useMutation(LikePost);
  const [unlikePost, { loading: unlikePostLoading }] = useMutation(UnLikePost);
  const [repostPost] = useMutation(RepostPost);
  const [commentPost] = useMutation(CommentPost);
  const [commentText, setCommentText] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);

    await refetch();

    setRefreshing(false);
  };
  const handleLike = async () => {
    if (likePostLoading || unlikePostLoading) return;
    if (data?.post?.isUserLiked === true) {
      await unlikePost({
        variables: { postId },
      });
    } else if (data?.post?.isUserLiked === false) {
      await likePost({
        variables: { postId },
      });
    } else {
      await refetch();
      return;
    }
    await refetch();
  };
  const handleRepost = async () => {
    if (data?.post?.isUserReposted === true) return;
    Alert.alert("Repost", "Are you sure you want to repost this post?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: async () => {
          if (data?.post?.isUserReposted === false) {
            await repostPost({
              variables: { postId },
            });
          }
          await refetch();
        },
      },
    ]);
  };
  const handleComment = async () => {
    if (!commentText || commentText === "") return;
    const result = await commentPost({
      variables: { postId, content: commentText },
    });
    if (result) {
      setCommentText("");
    }
    await refetch();
  };
  if (loading) return <Loading />;
  if (error) return <Text>Error</Text>;
  if (!data) return <Text>No Data</Text>;
  return (
    <SafeAreaView
      style={{ backgroundColor: "white", flex: 1, marginBottom: -25 }}
    >
      <HeaderMain navigation={navigation} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.postOverall}>
          <View style={styles.postHeader}>
            <Avatar
              rounded
              size={37}
              source={{
                uri: data?.post?.author?.imageUrl || undefined,
              }}
            />
            <View style={styles.postCaption}>
              <Text style={styles.boldText}>
                {data?.post?.author?.username}
              </Text>
              <Text>{data?.post?.content}</Text>
            </View>
          </View>
          <View style={{ overflow: "hidden" }}>
            {data?.post?.imageUrl && (
              <Image
                source={{
                  uri: data?.post?.imageUrl,
                }}
                style={{
                  width: 280,
                  height: 280,
                  borderRadius: 10,
                  marginTop: 10,
                }}
              />
            )}
          </View>

          <View style={styles.postCalltoAction}>
            <FontAwesome name="comment" size={18} color="#B1B1B1" />
            <TouchableOpacity
              onPress={handleRepost}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <FontAwesome
                name="retweet"
                size={18}
                color={data?.post?.isUserReposted ? "#1DC560" : "#B1B1B1"}
              />
              <Text style={styles.actionCounts}>{data?.post?.repostCount}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => await handleLike()}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              <FontAwesome
                name="heart"
                size={18}
                color={data?.post?.isUserLiked ? "#FF6464" : "#B1B1B1"}
              />
              <Text style={styles.actionCounts}>{data?.post?.likeCount}</Text>
            </TouchableOpacity>

            <FontAwesome name="share" size={18} color="#B1B1B1" />
          </View>
          <Text style={styles.timestamp}>
            {TimestampToDate(data?.post?.createdAt || "")}
          </Text>
        </View>
        {data?.post?.comments?.map((comment, index) => (
          <PostComment
            key={index}
            caption={comment?.content || ""}
            username={comment?.author?.username || ""}
            createdAt={comment?.createdAt || ""}
          />
        ))}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            height: 90,
            padding: 5,
          }}
        >
          <TextInput
            placeholder="Write a comment..."
            placeholderTextColor="#B1B1B1"
            style={styles.commentInput}
            value={commentText}
            onChangeText={setCommentText}
            multiline={true}
            maxLength={250}
            onSubmitEditing={() => {
              handleComment();
              Keyboard.dismiss();
            }}
          />
          <TouchableOpacity
            style={styles.commentAction}
            onPress={() => {
              handleComment();
              Keyboard.dismiss();
            }}
          >
            <Text style={{ color: "#E5E5E5" }}>post</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const HeaderMain = ({
  navigation,
}: {
  navigation: StackNavigationProp<any>;
}) => (
  <View style={styles.headerContainer}>
    <AntDesign
      name="arrowleft"
      size={24}
      color="black"
      onPress={() => navigation.goBack()}
    />
  </View>
);
const PostComment = ({
  caption,
  username,
  createdAt,
}: {
  caption: string;
  username: string;
  createdAt: string;
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
        <View style={styles.commentHeader}>
          <Text style={styles.boldText}>{username}</Text>
          <Text style={styles.commentTimestamp}>{FromNow(createdAt)}</Text>
        </View>
        <Text style={{ marginVertical: 5 }}>{caption}</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  commentAction: {
    backgroundColor: "#2D2D2D",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    textAlign: "center",
  },
  commentInput: {
    width: "80%",
    height: "90%",
    padding: 20,
    margin: 10,
    borderBottomColor: "#E5E5E5",
    fontSize: 14,
    backgroundColor: "#E5E5E5",
  },
  commentHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  commentTimestamp: {
    fontSize: 14,
    color: "#B1B1B1",
    fontWeight: "400",
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

  boldText: {
    fontSize: 16,
    fontWeight: "600",
  },
  postPicContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
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
  timestamp: {
    fontSize: 14,
    color: "#B1B1B1",
    fontWeight: "400",
    marginBottom: 10,
    paddingLeft: 30,
    textAlign: "left",
    width: "100%",
  },
  actionCounts: {
    fontSize: 14,
    color: "#B1B1B1",
    fontWeight: "500",
    marginLeft: 5,
  },
});
