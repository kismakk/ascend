import { StyleSheet, } from 'react-native'
import { COLORS } from '../../constants/theme'
import { Dimensions } from 'react-native'

const getDynamicStyles = (theme) => {
  const window = Dimensions.get('window')
  return StyleSheet.create({
  container: {
    margin: 10,
    flexDirection: "row",
    backgroundColor: COLORS[theme].primary,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "space-between",
    width: window.width * 0.8,
    height: 65,
    overflow: "hidden",
  },
  text: {
    color: COLORS[theme].text,
    padding: 10,
  },
  todobar: {
    flexDirection: "row",
    backgroundColor: COLORS[theme].primary,
    borderRadius: 30,
    alignItems: "center",
    width: window.width * 0.8,
    height: 70,
    paddingRight: 20, 
  },
  checkbox: {
    backgroundColor: COLORS[theme].green,
    width: 45,
    height: 85,
    justifyContent: "center",
    alignItems: "center",
  }
})
}

export default getDynamicStyles
