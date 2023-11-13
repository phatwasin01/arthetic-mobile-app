import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import AntDesign from "@expo/vector-icons/AntDesign";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { GetAllCategories, CreateProduct } from "../gql/document";
import { useQuery, useMutation } from "@apollo/client";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import { uploadToFirebase } from "../../firebaseConfig";
import Feather from "@expo/vector-icons/Feather";
import { LinearProgress } from "@rneui/base";
import Loading from "./Loading";
interface Category {
  id: string;
  name: string;
}
export default function CreateArt({
  navigation,
}: {
  navigation: StackNavigationProp<any>;
}) {
  const {
    data: categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(GetAllCategories);
  const [createProduct, { loading: createProductLoading }] =
    useMutation(CreateProduct);
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<Category>();
  const [image, setImage] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState(0);
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // variables
  const snapPoints = useMemo(() => ["95%"], []);
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
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
        "products",
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

  const handleCreateProduct = async () => {
    if (!productName) {
      Alert.alert("Please enter post content");
      return;
    }
    if (!selectedCategory) {
      Alert.alert("Please select a category");
      return;
    }
    const imageUrl = await uploadImage();
    if (!imageUrl) {
      return; // Alert is already handled in uploadImage
    }

    try {
      await createProduct({
        variables: {
          name: productName,
          price: productPrice,
          description: description,
          categoryId: selectedCategory?.id,
          imageUrl,
        },
      });
      setTimeout(() => {
        navigation.goBack();
      }, 1500);
    } catch (error) {
      Alert.alert("Error creating post");
    }
  };
  if (categoriesLoading) return <Loading />;
  if (categoriesError) return <Text>Error</Text>;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
    >
      <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
        <HeaderMain
          navigation={navigation}
          handleCreateProduct={handleCreateProduct}
        />
        <LinearProgress
          value={uploadProgress / 100}
          variant="determinate"
          color={uploadProgress === 0 ? "transparent" : "#359B82"}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{ flex: 1, paddingHorizontal: 20, marginTop: 20, gap: 8 }}
          >
            <View style={styles.textinputcontainer}>
              <Text>Name</Text>
              <TextInput
                style={styles.textinput}
                placeholder="Enter your Art Name"
                autoCapitalize="none"
                onChangeText={(text) => setProductName(text)}
              />
            </View>
            <View style={styles.textinputcontainer}>
              <Text>Price</Text>
              <TextInput
                style={styles.textinput}
                placeholder="Enter your Price"
                keyboardType="numeric"
                onChangeText={(text) => setProductPrice(Number(text))}
              />
            </View>
            <View style={styles.textinputcontainer}>
              <Text>Description</Text>
              <TextInput
                style={{ ...styles.textinput, height: 100 }}
                placeholder="Enter your description"
                multiline
                maxLength={250}
                onChangeText={(text) => setDescription(text)}
              />
            </View>
            <View style={styles.textinputcontainer}>
              <Text>Category</Text>
              <TouchableOpacity
                style={styles.textinputSelect}
                onPress={() => {
                  handlePresentModalPress();
                  Keyboard.dismiss();
                }}
              >
                <Text>{selectedCategory?.name || "Select Category"}</Text>
                <AntDesign name="caretdown" size={14} color="#2d2d2d" />
              </TouchableOpacity>
            </View>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}
              backgroundStyle={{
                backgroundColor: "white",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            >
              <View style={styles.contentContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    borderBottomWidth: 1,
                    borderColor: "#E5E5E5",
                    padding: 5,
                    marginHorizontal: 20,
                  }}
                >
                  <Text
                    style={{
                      color: "#2d2d2d",
                      fontWeight: "700",
                      fontSize: 16,
                    }}
                  >
                    Select Category
                  </Text>
                </View>
                <FlatList
                  style={{ width: "100%" }}
                  data={categories?.Categories}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{
                        width: "100%",
                        paddingVertical: 10,
                        marginHorizontal: 20,
                      }}
                      onPress={() => {
                        setSelectedCategory({
                          id: item?.id || "",
                          name: item?.name || "",
                        });
                        bottomSheetModalRef.current?.dismiss();
                      }}
                    >
                      <Text
                        style={{
                          color: "#2d2d2d",
                          fontWeight: "600",
                          fontSize: 16,
                        }}
                      >
                        {item?.name}
                      </Text>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item) => item?.id + ""}
                />
              </View>
            </BottomSheetModal>
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
                <TouchableOpacity
                  onPress={pickImage}
                  style={styles.buttonStyle}
                >
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
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
const HeaderMain = ({
  navigation,
  handleCreateProduct,
}: {
  navigation: StackNavigationProp<any>;
  handleCreateProduct: () => void;
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
      onPress={handleCreateProduct}
    />
  </View>
);

const styles = StyleSheet.create({
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
  button: {
    display: "flex",
    borderRadius: 5,
    backgroundColor: "#E5e5e5",
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  textinputcontainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 11,
  },
  textinput: {
    width: "100%",
    padding: 10,
    borderColor: "#2d2d2d",
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 14,
  },
  textinputSelect: {
    width: "100%",
    padding: 10,
    borderColor: "#2d2d2d",
    borderWidth: 2,
    borderRadius: 10,
    fontSize: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    marginBottom: 20,
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
});
