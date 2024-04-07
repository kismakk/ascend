import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";
import { Dimensions } from "react-native";

const getDynamicStyles = (theme) => {
  const window = Dimensions.get("window");
  return StyleSheet.create({
    container: {
      marginTop: 30,
      marginBottom: 30,
      flexDirection: "row",
      width: window.width * 0.5,
      height: 100,
    },
    textContainer: {
      padding: 15,
      paddingLeft: 20,
      flexDirection: "column",
      justifyContent: "space-between",
    },
    stats: {
      flexDirection: "column",
    },
    image: {
      backgroundColor: COLORS[theme].secondary,
      width: 100,
      height: 100,
    },
    text: {
      color: COLORS[theme].text,
      maxWidth: window.width * 0.5,
      maxHeight: 40,
    },
  });
}

export default getDynamicStyles;
