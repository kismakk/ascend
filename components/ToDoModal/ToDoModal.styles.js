import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  modalView: {
    position: 'absolute',
    left: 0,
    width: width,
    height: height,
    backgroundColor: '#fff',
    padding: 35,
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  backdrop: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },

});