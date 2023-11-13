import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Market from "../screens/Market";
import CreateArt from "../screens/CreateArt";
const Stack = createStackNavigator();
const Home = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="MarketPage"
    >
      <Stack.Screen name="MarketPage" component={Market} />
      <Stack.Screen name="CreateArt" component={CreateArt} />
    </Stack.Navigator>
  );
};

export default Home;
