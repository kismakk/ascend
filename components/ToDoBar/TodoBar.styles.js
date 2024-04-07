import { StyleSheet, } from 'react-native'
import { COLORS } from '../../constants/theme'
import { Dimensions } from 'react-native'

const getDynamicStyles = (theme) => {
  const window = Dimensions.get('window')
  return StyleSheet.create({
  todobar: {
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
  text: {
    color: COLORS[theme].text,
  }
})
}

export default getDynamicStyles
