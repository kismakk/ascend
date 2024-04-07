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
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "space-between",
      width: window.width * 0.8,
      height: 70,
      paddingLeft: 20,
      paddingRight: 20,
    },
    posNeg: {
      backgroundColor: COLORS[theme].primary,
      color: COLORS[theme].background,
    },
    text: {
      color: COLORS[theme].text,
      maxWidth: window.width * 0.5,
      maxHeight: 40,
    },
  });
}

export default getDynamicStyles;
