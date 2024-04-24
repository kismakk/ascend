import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants/theme';

const getDynamicStyles = (theme) => {
  const { height, width } = Dimensions.get('window');

  return StyleSheet.create({
    modalView: {
      position: 'absolute',
      left: 0,
      width: width * 0.8,
      height: height,
      backgroundColor: COLORS[theme].primary,
      padding: 40,
      height: height,
    },
    centeredView: {
      flex: 1,
    },
    navBottom: {
      position: 'absolute',
      bottom: 50,
      left: 20,
      width: width * 0.8,
      padding: 20,
      borderTopColor: COLORS[theme].text,
    },
    navTop: {
      flexDirection: 'row',
      paddingBottom: 50,
      paddingTop: 35
    },
    image: {
      width: 110,
      height: 110,
      backgroundColor: COLORS[theme].secondary,
      borderRadius: 10,
    },
    username: {
      color: COLORS[theme].text,
      fontWeight: 'bold',
      paddingLeft: 20,
      fontSize: 20,
    },
    backdrop: {
      position: 'absolute',
      left: 0,
      top: 0,
      width: width,
      height: height,
      backgroundColor: 'rgba(0,0,0,0.5)'
    },
    navText: {
      color: COLORS[theme].text,
      fontSize: 20,
      fontWeight: 'bold',
    },
    navItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
  });
}

export default getDynamicStyles;