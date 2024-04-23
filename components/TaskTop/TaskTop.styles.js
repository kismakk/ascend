import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/theme";
import { Dimensions } from "react-native";

const getDynamicStyles = (theme) => {
  const window = Dimensions.get("window");
  return StyleSheet.create({
    container: {
      marginBottom: 30,
      flexDirection: "row",
      width: window.width * 0.6,
      alignSelf: "center",
      height: 100,
    },
    base: {
      flexDirection: "column",
      width: window.width,
    },
    nav: {
      flexDirection: "row",
      alignItems: "flex-end",
      padding: 30,
    },
    textContainer: {
      padding: 5,
      paddingLeft: 25,
      flexDirection: "column",
      justifyContent: "space-between",
    },
    stats: {
      flexDirection: "column",
    },
    image: {
      backgroundColor: COLORS[theme].secondary,
      width: 110,
      height: 110,
      borderRadius: 10,
    },
    text: {
      color: COLORS[theme].text,
      maxWidth: window.width * 0.5,
      maxHeight: 40,
    },
    username: {
      color: COLORS[theme].text,
      paddingLeft: 10,
      color: COLORS[theme].secondary,
      fontSize: 20,
    },
  });
}

export default getDynamicStyles;
