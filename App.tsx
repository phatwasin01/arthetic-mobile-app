import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import LoginPage from "./src/screens/LoginPage";
import Auth from "./src/navigation/Auth";
import Splash from "./src/screens/Splash";
import Profile from "./src/navigation/Profile";
import HomePage from "./src/navigation/Home";
import SearchPage from "./src/navigation/Search";
import Market from "./src/navigation/Market";
import {
  deleteValueFromSecureStore,
  getValueFromSecureStore,
} from "./src/utils/auth";
import { StatusBar } from "expo-status-bar";

import { setContext } from "@apollo/client/link/context";
import { createHttpLink } from "@apollo/client";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import axios from "axios";
const userTokenKey = "userToken";
const httpLink = createHttpLink({
  uri: "https://www.arthetic.live/graphql",
});
const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = await getValueFromSecureStore(userTokenKey);
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    },
  };
});

const cache = new InMemoryCache();
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
});
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(); // Initialize with null to represent a 'loading' state

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getValueFromSecureStore(userTokenKey);

        if (token) {
          const response = await axios.get(
            "https://www.arthetic.live/check-auth",
            {
              headers: { Authorization: token },
            }
          );

          if (response.status === 200) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
            await deleteValueFromSecureStore(userTokenKey);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);
  if (isAuthenticated === undefined) return <Splash />; // Or some other loading indicator (spinner, etc
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={isAuthenticated === true ? "MainTabs" : "Auth"}
        >
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
        <StatusBar hidden={false} />
      </NavigationContainer>
    </ApolloProvider>
  );
}

function MainTabs() {
  return (
    <BottomSheetModalProvider>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomePage}
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="home"
                size={24}
                color={focused ? "black" : "gray"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Search"
          component={SearchPage}
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="search"
                size={24}
                color={focused ? "black" : "gray"}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Market"
          component={Market}
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="shopping-cart"
                size={24}
                color={focused ? "black" : "gray"}
              />
            ),
          }}
        />
        {/* <Tab.Screen
          name="Notification"
          component={HomePage}
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="heart"
                size={24}
                color={focused ? "black" : "gray"}
              />
            ),
          }}
        /> */}
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="user"
                size={24}
                color={focused ? "black" : "gray"}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </BottomSheetModalProvider>
  );
}
