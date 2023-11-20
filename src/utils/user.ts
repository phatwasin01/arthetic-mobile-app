import { StackNavigationProp } from "@react-navigation/stack";

export const navigateToUserProfile = ({
  navigation,
  username,
}: {
  navigation: StackNavigationProp<any>;
  username: string;
}) => {
  navigation.navigate("UserProfile", {
    username,
  });
};
