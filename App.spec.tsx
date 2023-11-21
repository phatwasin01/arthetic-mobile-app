import React from "react";
import { render } from "@testing-library/react-native";
import App from "./App";
import FeedPage from "./src/screens/FeedPage";
import CreateArt from "./src/screens/CreateArt";
import CreatePost from "./src/screens/CreatePost";
import LoginPage from "./src/screens/LoginPage";
import Market from "./src/screens/Market";
import MyProducts from "./src/screens/MyProducts";
import SignupPage from "./src/screens/SignupPage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MockedProvider } from "@apollo/client/testing";

describe("App", () => {
  it("renders correctly", () => {
    render(<App />);
  });
});
describe("MyProducts", () => {
  it("renders correctly", () => {
    const Stack = createStackNavigator();
    render(
      <MockedProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="MyProducts" component={MyProducts} />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );
  });
});
describe("FeedPage", () => {
  it("renders correctly", () => {
    const Stack = createStackNavigator();
    render(
      <MockedProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="FeedPage" component={FeedPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );
  });
});
describe("CreatePost", () => {
  it("renders correctly", () => {
    const Stack = createStackNavigator();
    render(
      <MockedProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="CreatePost" component={CreatePost} />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );
  });
});
describe("LoginPage", () => {
  it("renders correctly", () => {
    const Stack = createStackNavigator();
    render(
      <MockedProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="LoginPage" component={LoginPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );
  });
});
describe("Market", () => {
  it("renders correctly", () => {
    const Stack = createStackNavigator();
    render(
      <MockedProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Market" component={Market} />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );
  });
});

describe("SignupPage", () => {
  it("renders correctly", () => {
    const Stack = createStackNavigator();
    render(
      <MockedProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="SignupPage" component={SignupPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );
  });
});

describe("CreateArt", () => {
  it("renders correctly", () => {
    const Stack = createStackNavigator();
    render(
      <MockedProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="CreateArt" component={CreateArt} />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedProvider>
    );
  });
});
