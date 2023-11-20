import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PostPage from "../components/post/Post";
import Profile from "../screens/Profile";
const Stack = createStackNavigator();
const Home = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="ProfilePage"
    >
      <Stack.Screen name="ProfilePage" component={Profile} />
      <Stack.Screen name="PostPage" component={PostPage} />
    </Stack.Navigator>
  );
};

export default Home;
