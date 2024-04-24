import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants/theme';

const getDynamicStyles = (theme) => {
  const { height, width } = Dimensions.get('window');

  return StyleSheet.create({
    todoStatisticButtons
      : {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 10,
      width: 10,
    },


  });
}

export default getDynamicStyles;