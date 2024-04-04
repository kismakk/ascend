import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTWEIGHT, SIZES } from '../../../constants/theme';

const getDynamicStyles = (theme) => {
  const { height, width } = Dimensions.get('window');

  return StyleSheet.create({
    modalView: {
      position: 'absolute',
      width: width,
      height: height,
      backgroundColor: COLORS[theme].background,
      padding: 35,
      justifyContent: 'center',
    },
    centeredView: {
      flex: 1,
      backgroundColor: COLORS[theme].background,
      alignItems: 'center',
    },
    backdrop: {
      position: 'absolute',
      width: width,
      height: height,
    },
    form: {
      padding: 20,
      flexDirection: 'column',
    },
    formInputContainer: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems: 'flex-start',
      justifyContent: 'space-between',
    },
    inputTitle: {
      fontSize: SIZES.medium,
      paddingBottom: 10,
      color: COLORS[theme].text,
    },
    formInput: {
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: COLORS[theme].text,
      padding: 10,
      color: COLORS[theme].text,
    },
    optionButtons: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
      paddingBottom: 10,
    },
    option: {
      fontSize: SIZES.large,
    },
    optionSelected: {
      fontWeight: FONTWEIGHT.bold,
      color: COLORS[theme].accent,
    },
    optionNotSelected: {
      color: COLORS[theme].text,
    },
    errorText: {
      color: 'red',
      paddingVertical: 5,
    },
    buttonContainer: {
      paddingVertical: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderRadius: 10,
      backgroundColor: COLORS[theme].secondary,
    },
    buttonText: {
      fontSize: 16,
      color: COLORS[theme].text,
    },
  });
};

export default getDynamicStyles;
