import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";
import { Dimensions } from "react-native";

const getDynamicStyles = (theme) => {
  const window = Dimensions.get("window");
  return StyleSheet.create({
    container: {
      margin: 10,
      flexDirection: "row",
      backgroundColor: COLORS[theme].primary,
      borderRadius: 18,
      alignItems: "center",
      width: window.width * 0.8,
      height: 65,
      overflow: "hidden",
    },
    posNegBase: {
      color: COLORS[theme].text,
      backgroundColor: COLORS[theme].primary,
      width: 30,
      height: 30,
      borderRadius: 30,
      alignItems: "center",
    },
    Pos: {
      color: COLORS[theme].text,
      fontSize: 25,
      fontWeight: "bold",
      bottom: 1,
    },
    Neg: {
      color: COLORS[theme].text,
      fontSize: 25,
      fontWeight: "bold",
      bottom: 2,
    },
    text: {
      color: COLORS[theme].text,
      maxWidth: window.width * 0.5,
      maxHeight: 40,
      paddingLeft: 15,
    },
    PosButton: {
      backgroundColor: COLORS[theme].green,
      width: 55,
      height: 85,
      justifyContent: "center",
      alignItems: "center",
    },
    NegButton: {
      backgroundColor: COLORS[theme].red,
      width: 55,
      height: 85,
      justifyContent: "center",
      alignItems: "center",
    },
  });
}

export default getDynamicStyles;
