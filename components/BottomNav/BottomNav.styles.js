import { StyleSheet, } from 'react-native';
import { COLORS } from "../../constants/theme";
import { Dimensions } from "react-native";

const getDynamicStyles = (theme) => {
  const window = Dimensions.get("window");

  return StyleSheet.create({
    bottomNav: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      width: window.width,
      height: window.height * 0.08,
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'space-between',
      paddingLeft: 65,
      paddingRight: 65,
      backgroundColor: COLORS[theme].background,
    },
    buttons: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    plus: {
      backgroundColor: COLORS[theme].secondary,
      borderRadius: 18,
      padding: 10,
      marginTop: -55,
    },
    text: {
      color: COLORS[theme].text,
    },
  });
}
export default getDynamicStyles;