import * as SecureStore from "expo-secure-store";
import { CommonActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export async function saveToSecureStore(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getValueFromSecureStore(key: string) {
  let result = await SecureStore.getItemAsync(key);

  return result;
}

export async function deleteValueFromSecureStore(key: string) {
  await SecureStore.deleteItemAsync(key);
}

export function loginNavigate(navigation: StackNavigationProp<any>) {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: "MainTabs" }],
    })
  );
}

export function logoutNavigate(navigation: StackNavigationProp<any>) {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: "Login" }],
    })
  );
}

export async function deleteValueFromSecureStoreAndLogout(
  key: string,
  navigation: StackNavigationProp<any>
) {
  await deleteValueFromSecureStore(key);
  logoutNavigate(navigation);
}
