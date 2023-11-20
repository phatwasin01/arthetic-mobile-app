import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import AntDesign from "@expo/vector-icons/AntDesign";
import { TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { uploadToFirebase } from "../../firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { useMutation } from "@apollo/client";
import { CreateUser } from "../gql/document";
import { LinearProgress } from "@rneui/base";

const HeaderMain = () => (
  <View style={styles.headerContainer}>
    <View style={styles.headerLeft}>
      <Image
        style={styles.logoheader}
        source={require("../../assets/logo.png")}
      />
      <Text style={styles.headerText}>Register</Text>
    </View>
  </View>
);

const SignupPage = ({
  navigation,
}: {
  navigation: StackNavigationProp<any>;
}) => {
  const [image, setImage] = useState<string>("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fname, setFname] = useState<string>("");
  const [lname, setLname] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirm, setConfirm] = useState<string>("");
  const [createUser, { loading: createUserLoading }] = useMutation(CreateUser);
  const handleRegister = async () => {
    if (!fname || !lname || !username || !password || !confirm) {
      Alert.alert("Please fill in all fields");
      return;
    }
    if (password !== confirm) {
      Alert.alert("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Password must be at least 6 characters long");
      return;
    }
    try {
      if (image === "") {
        await createUser({
          variables: {
            fname,
            lname,
            username,
            password,
          },
        });
      } else {
        const imageUrl = await uploadImage();
        console.log(imageUrl);
        if (imageUrl) {
          await createUser({
            variables: {
              fname,
              lname,
              username,
              password,
              imageUrl,
            },
          });
        }
      }
      Alert.alert("Registration successful");
      navigation.goBack();
    } catch (error) {
      Alert.alert("An error occurred while registering");
      navigation.goBack();
    }
  };

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
        "profile",
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
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
    >
      <SafeAreaView style={styles.container}>
        <HeaderMain />
        <LinearProgress
          value={uploadProgress / 100}
          variant="determinate"
          color={uploadProgress === 0 ? "transparent" : "#359B82"}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView>
            <View style={styles.container1}>
              <View style={styles.textinputcontainer}>
                <Text>First Name</Text>
                <TextInput
                  onChangeText={setFname}
                  style={styles.textinput}
                  placeholder="Enter your fisrt name here"
                  maxLength={20}
                  autoCapitalize="sentences"
                  autoComplete="name"
                />
              </View>
              <View style={styles.textinputcontainer}>
                <Text>Last name</Text>
                <TextInput
                  onChangeText={setLname}
                  style={styles.textinput}
                  placeholder="Enter your last name here"
                  autoCapitalize="sentences"
                  autoComplete="name"
                />
              </View>
              <View style={styles.textinputcontainer}>
                <Text>Username</Text>
                <TextInput
                  onChangeText={setUsername}
                  style={styles.textinput}
                  placeholder="Enter username here"
                  autoCapitalize="none"
                />
              </View>
              <View style={styles.textinputcontainer}>
                <Text>Password</Text>
                <TextInput
                  onChangeText={setPassword}
                  style={styles.textinput}
                  placeholder="Enter password here"
                  secureTextEntry
                  autoComplete="off"
                />
              </View>
              <View style={styles.textinputcontainer}>
                <Text>Confirm Password</Text>
                <TextInput
                  onChangeText={setConfirm}
                  style={styles.textinput}
                  placeholder="Confirm password here"
                  secureTextEntry
                  autoComplete="off"
                />
              </View>
              <View style={styles.ImgContainer}>
                {image && (
                  <View
                    style={{
                      position: "relative",
                      width: 225,
                      height: 225,
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
            <View style={styles.container2}>
              <TouchableOpacity
                style={styles.button1}
                disabled={createUserLoading || uploadProgress !== 0}
                onPress={handleRegister}
              >
                <Text style={styles.buttonText1}>Register</Text>
                {createUserLoading ||
                  (uploadProgress !== 0 && <ActivityIndicator />)}
              </TouchableOpacity>
              <View style={styles.buttonnobutton}>
                <Text style={styles.buttonText2}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text style={styles.buttonText3}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignupPage;

const styles = StyleSheet.create({
  logotext: {
    color: "#2d2d2d",
    fontSize: 40,
    fontStyle: "normal",
    fontWeight: "500",
  },
  container1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 26,
    padding: 20,
    // borderWidth: 1,
  },
  container2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  container: {
    flex: 1,
  },
  textinputcontainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 11,
  },
  textinput: {
    width: 276,
    height: 44,
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 15,
    borderColor: "#2d2d2d",
    borderWidth: 2,
    borderRadius: 33,
    fontSize: 14,
  },
  button1: {
    width: 276,
    height: 44,
    display: "flex",
    flexDirection: "row",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 33,
    backgroundColor: "#2d2d2d",
    fontSize: 14,
  },
  button2: {
    width: 276,
    height: 44,
    display: "flex",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderRadius: 33,
    fontSize: 14,
  },
  buttonnobutton: {
    display: "flex",
    flexDirection: "row",
    fontSize: 14,
    gap: 5,
    paddingTop: 15,
  },
  logo: {
    height: 180,
    width: 183,
  },

  buttonText1: {
    color: "#fffffb",
  },

  buttonText2: {
    color: "#2d2d2d",
  },

  buttonText3: {
    color: "#ff473e",
    textDecorationLine: "underline",
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
  logoheader: {
    height: 29,
    width: 29.5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2D2D2D",
  },
  ImgContainer: {
    display: "flex",
    width: "70%",
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
