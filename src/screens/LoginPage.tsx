import { useMutation } from "@apollo/client";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { Login } from "../gql/document";
import { SafeAreaView } from "react-native";
import {
  saveToSecureStore,
  getValueFromSecureStore,
  loginNavigate,
} from "../utils/auth";
import { CommonActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

const userTokenKey = "userToken";

export default function LoginPage({
  navigation,
}: {
  navigation: StackNavigationProp<any>;
}) {
  const [login, { data }] = useMutation(Login);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      const response = await login({
        variables: { username, password },
      });
      if (
        response &&
        response.data &&
        response.data.login &&
        response.data.login.token
      ) {
        // Save the token to AsyncStorage
        await saveToSecureStore(userTokenKey, response.data.login.token);
        console.log("Login successful");
        // const token = await getValueFromSecureStore(userTokenKey);
        // console.log("Secure Store Token: ", token);
        // Navigate to the Home screen (or another screen of your choice)
        loginNavigate(navigation);
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (error: any) {
      alert("An error occurred: " + error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#FFFFFF" }}
    >
      <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.container1}>
              <Image
                style={styles.logo}
                source={require("../../assets/logo.png")}
              />
              <Text style={styles.logotext}>ARTHETIC</Text>
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
                />
              </View>
            </View>
            <View style={styles.container2}>
              <TouchableOpacity style={styles.button1} onPress={handleLogin}>
                <Text style={styles.buttonText1}>Login</Text>
              </TouchableOpacity>
              <View style={styles.orDivider}>
                <View style={styles.divider} />
                <Text style={styles.orText}>or</Text>
                <View style={styles.divider} />
              </View>
              <TouchableOpacity style={styles.button2}>
                <Text style={styles.buttonText2}>Signup</Text>
              </TouchableOpacity>
            </View>
            <StatusBar style="auto" />
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 67,
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
    paddingRight: 110,
    borderColor: "#2d2d2d",
    borderWidth: 2,
    borderRadius: 33,
    fontSize: 14,
  },
  button1: {
    width: 276,
    height: 44,
    display: "flex",
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

  orDivider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },

  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "black",
  },

  orText: {
    width: 50,
    textAlign: "center",
  },
});
