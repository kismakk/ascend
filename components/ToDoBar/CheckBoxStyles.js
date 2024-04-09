import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/theme';

const getDynamicStyles = (theme) => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    checkbox: {
      borderColor: 'black',
      backgroundColor: COLORS[theme].primary,
      borderWidth: 1,
      borderRadius: 50,
      height: 30,
      width: 30,
    },
    checkboxSelected: {
      backgroundColor: COLORS[theme].primary,
    },
  });
};
export default getDynamicStyles;

