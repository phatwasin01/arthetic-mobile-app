import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Search from "../screens/Search";
import PostPage from "../components/post/Post";
import OtherProfile from "../screens/OtherProfile";
const Stack = createStackNavigator();
const Home = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="SearchPage"
    >
      <Stack.Screen name="SearchPage" component={Search} />
      <Stack.Screen name="UserProfile" component={OtherProfile} />
      <Stack.Screen name="PostPage" component={PostPage} />
    </Stack.Navigator>
  );
};

export default Home;
