import type { ScaledSize } from "react-native";
import { Dimensions } from "react-native";

export const HEADER_HEIGHT = 100;

export const ElementsText = {
  AUTOPLAY: "AutoPlay",
};
const isWeb = false;
export const window: ScaledSize = isWeb
  ? {
      ...Dimensions.get("window"),
      width: 700,
    }
  : Dimensions.get("window");

const iosDeviceWidth = Dimensions.get("window").width;
