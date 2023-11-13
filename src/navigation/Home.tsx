import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import FeedPage from "../screens/FeedPage";
import CreatePost from "../screens/CreatePost";
import PostPage from "../components/post/Post";
const Stack = createStackNavigator();
const Home = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="FeedPage"
    >
      <Stack.Screen name="FeedPage" component={FeedPage} />
      <Stack.Screen name="CreatePost" component={CreatePost} />
      <Stack.Screen name="PostPage" component={PostPage} />
    </Stack.Navigator>
  );
};

export default Home;
