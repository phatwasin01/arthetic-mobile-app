import React, { Suspense } from "react";
import type { StyleProp, ViewStyle, ImageURISource } from "react-native";
import { StyleSheet, View, ActivityIndicator, Image } from "react-native";

interface Props {
  style?: StyleProp<ViewStyle>;
  index?: number;
  showIndex?: boolean;
}

const imageSources: { [key: number]: ImageURISource } = {
  1: require("../../../assets/event1.jpeg"),
  2: require("../../../assets/event2.jpeg"),
  3: require("../../../assets/event3.jpeg"),
  4: require("../../../assets/event4.jpeg"),
  5: require("../../../assets/event5.jpeg"),
  6: require("../../../assets/event6.jpeg"),
};
export const SBImageItem: React.FC<Props> = ({ style, index: _index }) => {
  const index = (_index || 0) + 1;
  return (
    <View style={[styles.container, style]}>
      <Suspense fallback={<ActivityIndicator size="small" />}>
        <Image key={index} style={styles.image} source={imageSources[index]} />
      </Suspense>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch", // or 'contain', depending on your preference
  },
});
