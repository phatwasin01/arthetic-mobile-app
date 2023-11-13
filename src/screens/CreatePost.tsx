import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Avatar, LinearProgress } from "@rneui/base";
import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { StackNavigationProp } from "@react-navigation/stack";
import { uploadToFirebase } from "../../firebaseConfig";
import { useMutation } from "@apollo/client";
import { CreatePost as CreatePostMutation } from "../gql/document";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
const HeaderMain = ({
  navigation,
  handleUploadImageAndPost,
}: {
  navigation: StackNavigationProp<any>;
  handleUploadImageAndPost: () => void;
}) => (
  <View style={styles.headerContainer}>
    <AntDesign
      name="close"
      size={24}
      color="black"
      onPress={() => navigation.goBack()}
    />
    <Feather
      name="check"
      size={24}
      color="black"
      onPress={handleUploadImageAndPost}
    />
  </View>
);

export default function CreatePost({
  navigation,
}: {
  navigation: StackNavigationProp<any>;
}) {
  const [postContent, setPostContent] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [createPost, { loading: createPostLoading }] =
    useMutation(CreatePostMutation);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (e) {
      Alert.alert("Error picking image");
    }
  };

  const uploadImage = async () => {
    if (!image) {
      Alert.alert("No image selected");
      return null;
    }

    const fileName = image.split("/").pop();
    if (!fileName) {
      Alert.alert("Invalid image file");
      return null;
    }

    try {
      const uploadResp = await uploadToFirebase(
        image,
        fileName,
        "posts",
        setUploadProgress
      );
      if (uploadResp) {
        return uploadResp.downloadUrl.split("&token")[0];
      }
      throw new Error("Upload failed");
    } catch (error) {
      Alert.alert("Error uploading image");
      return null;
    }
  };

  const handleCreatePost = async () => {
    if (!postContent) {
      Alert.alert("Please enter post content");
      return;
    }
    const imageUrl = await uploadImage();
    if (!imageUrl) {
      return; // Alert is already handled in uploadImage
    }

    try {
      await createPost({
        variables: { content: postContent, imageUrl },
      });
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (error) {
      Alert.alert("Error creating post");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <HeaderMain
        navigation={navigation}
        handleUploadImageAndPost={handleCreatePost}
      />
      <LinearProgress
        value={uploadProgress / 100}
        variant="determinate"
        color={uploadProgress === 0 ? "transparent" : "#359B82"}
      />
      <ScrollView style={{ width: "100%" }}>
        <View style={styles.captionInput}>
          <Avatar
            rounded
            size={37}
            source={{
              uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
            }}
          />
          <TextInput
            style={styles.inputstyle}
            placeholder="Write something"
            editable
            multiline
            maxLength={250}
            numberOfLines={5}
            value={postContent}
            onChangeText={setPostContent}
          />
        </View>
        <View style={styles.ImgContainer}>
          {image && (
            <View
              style={{
                position: "relative",
                width: 280,
                height: 280,
                marginTop: 10,
              }}
            >
              <Image
                source={{ uri: image }}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#E5E5E5",
                }}
                resizeMode="cover"
              />
              <View
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  backgroundColor: "#E5E5E5",
                  borderRadius: 15,
                  padding: 5,
                  zIndex: 1,
                  elevation: 1,
                }}
              >
                <AntDesign
                  name="close"
                  size={22}
                  color="black"
                  onPress={() => {
                    setImage("");
                  }}
                />
              </View>
            </View>
          )}
          {!image && (
            <TouchableOpacity onPress={pickImage} style={styles.buttonStyle}>
              <MaterialCommunityIcons
                name="file-image-plus"
                style={{ color: "#B1B1B1" }}
                size={26}
                color="black"
              />
              <Text style={{ color: "#B1B1B1" }}>Add image</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cancelButton: {
    display: "flex",
    borderRadius: 5,
    borderWidth: 2.5,
    borderColor: "#E5E5E5",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
  },
  container: {
    flex: 1,
    width: "100%",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
  button: {
    display: "flex",
    borderRadius: 5,
    backgroundColor: "#E5e5e5",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  ImgContainer: {
    display: "flex",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 5,
    paddingBottom: 15,
  },
  inputstyle: {
    width: "90%",
    fontSize: 18,
    padding: 10,
  },
  captionInput: {
    width: "100%",
    flexDirection: "row",
    padding: 15,
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
  buttonStyle: {
    display: "flex",
    borderRadius: 5,
    borderColor: "#B1B1B1",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 10,
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "row",
    padding: 20,
  },
});
