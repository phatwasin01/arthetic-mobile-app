import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "../screens/LoginPage";
import SignupPage from "../screens/SignupPage";
const Stack = createStackNavigator();
const Home = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      <Stack.Screen name="Login" component={LoginPage} />
      <Stack.Screen name="Signup" component={SignupPage} />
    </Stack.Navigator>
  );
};

export default Home;
