import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import React, { useRef } from 'react';
import { useTheme } from '../../hooks/ThemeContext'
import Icon from 'react-native-vector-icons/Ionicons';
import getDynamicStyles from './CheckBoxStyles';
import { COLORS } from '../../constants/theme';


export default function CheckBox({
  onPress,
  isChecked,
  containerStyle,
  checkboxStyle,
}) {
  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);
  const animatedWidth = useRef(new Animated.Value(0)).current
  const startAnimation = () => {
    const toValue = isChecked ? 0 : 30
    Animated.timing(animatedWidth, {
      toValue: toValue,
      duration: 500,
      useNativeDriver: false,
    }).start()
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
      onPress={() => {
        startAnimation(),
        onPress()
      }}
        style={[
          styles.checkbox,
          isChecked && styles.checkboxSelected,
          checkboxStyle,
        ]}
      >
        <Animated.View style={{width: animatedWidth}}>
          <Icon name='checkmark' size={30} style={{color: COLORS[theme].text}}/>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

