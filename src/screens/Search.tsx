import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  RefreshControl,
  ActivityIndicator,
  Touchable,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar, SearchBar, Skeleton } from "@rneui/base";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GetPostGlobal, SearchUser } from "../gql/document";
import Loading from "./Loading";
import { StackNavigationProp } from "@react-navigation/stack";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
export default function Search({
  navigation,
}: {
  navigation: StackNavigationProp<any>;
}) {
  const [searchValue, setSearchValue] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  //mock data
  const { loading, error, data, refetch } = useQuery(GetPostGlobal);
  const [searchUser, { loading: searchUserLoading, data: searchUserData }] =
    useLazyQuery(SearchUser);
  const [refreshing, setRefreshing] = useState(false);
  const [imageLoadingStatus, setImageLoadingStatus] = useState<
    Record<string, "loading" | "loaded" | "error">
  >({});
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout>();
  useEffect(() => {
    if (data && data.discoverGlobalPosts) {
      // Initialize loading status for each image
      const initialStatus: Record<string, "loading" | "loaded" | "error"> = {};
      data.discoverGlobalPosts.forEach((post) => {
        initialStatus[post.id] = "loading"; // Assuming each post has a unique 'id'
      });
      setImageLoadingStatus(initialStatus);
    }
  }, [data]);

  const handleImageLoaded = (id: string) => {
    setImageLoadingStatus((prev) => ({ ...prev, [id]: "loaded" }));
  };

  const handleImageError = (id: string) => {
    setImageLoadingStatus((prev) => ({ ...prev, [id]: "error" }));
  };
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  const handleViewPost = (postId: string) => {
    navigation.navigate("PostPage", { postId });
  };

  const handleSearchInput = (text: string) => {
    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }
    setSearchValue(text);

    setDebounceTimeout(
      setTimeout(() => {
        if (text.length > 0) {
          searchUser({ variables: { username: text } });
        }
      }, 500)
    );
  };
  if (loading) return <Loading />;
  if (error) return <Text>Error</Text>;
  if (!data) return <Text>No data</Text>;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <SearchBar
        platform="ios"
        onChangeText={(e) => {
          handleSearchInput(e);
        }}
        placeholder="Search here..."
        placeholderTextColor="#888"
        showLoading={isSearching}
        onPressIn={() => setIsSearchMode(true)}
        onCancel={() => setIsSearchMode(false)}
        value={searchValue}
        autoCapitalize="none"
      />
      <ScrollView style={{ width: "100%" }}>
        <View
          style={{
            display: isSearchMode ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              color: "#888",
              textAlign: "center",
            }}
          >
            Search results for "{searchValue}"
          </Text>
          <View style={styles.userSearchContainer}>
            {searchUserData?.searchUsers.map((user) => (
              <View style={styles.userSearchItem} key={user.id}>
                <Avatar
                  rounded
                  source={{ uri: user.imageUrl || undefined }}
                  size="small"
                />
                <Text style={{ fontWeight: "500", fontSize: 14 }}>
                  {user.username}
                </Text>
              </View>
            ))}
            {searchUserLoading && <ActivityIndicator size="small" />}
          </View>
        </View>
        <View style={styles.gridContainer}>
          {data.discoverGlobalPosts.map((item) => (
            <View
              key={item.id}
              style={{
                display: isSearchMode ? "none" : "flex",
                ...styles.gridItem,
              }}
            >
              {imageLoadingStatus[item.id] === "loading" && (
                <Skeleton
                  height={windowWidth / 3 - 2}
                  width={windowWidth / 3 - 2}
                  animation="pulse"
                  skeletonStyle={{
                    backgroundColor: "#E5E5E5",
                  }}
                />
              )}
              <TouchableWithoutFeedback onPress={() => handleViewPost(item.id)}>
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={{ uri: item.imageUrl || undefined }}
                  onLoad={() => handleImageLoaded(item.id)}
                  onError={() => handleImageError(item.id)}
                />
              </TouchableWithoutFeedback>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  gridItem: {
    width: windowWidth / 3 - 2,
    height: windowWidth / 3 - 2,
    margin: 1,
    overflow: "hidden",
  },
  userSearchContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 15,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  userSearchItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    gap: 10,
  },
});
