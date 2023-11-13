import { StackNavigationProp } from "@react-navigation/stack";
import { View, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export const HeaderGoback = ({
  navigation,
}: {
  navigation: StackNavigationProp<any>;
}) => (
  <View style={styles.headerContainer}>
    <AntDesign
      name="arrowleft"
      size={24}
      color="black"
      onPress={() => navigation.goBack()}
    />
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    borderColor: "#E5E5E5",
    borderBottomWidth: 1,
    width: "100%",
    height: "7.11%",
    flexShrink: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 150,
    paddingHorizontal: 15,
  },
});
