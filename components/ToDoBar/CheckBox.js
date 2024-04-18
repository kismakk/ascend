import {
  View,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import React, { useRef, useEffect } from 'react';
import { useTheme } from '../../hooks/ThemeContext'
import Icon from 'react-native-vector-icons/Ionicons';
import getDynamicStyles from './CheckBoxStyles';
import { COLORS } from '../../constants/theme';

export default function CheckBox({
  onPress,
  isChecked,
  containerStyle,
  checkboxStyle,
  isDone
}) {
  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);
  const animatedWidth = useRef(new Animated.Value(0)).current

  const startAnimation = (value) => {
    Animated.timing(animatedWidth, {
      toValue: value,
      duration: 500,
      useNativeDriver: false,
    }).start()
  }

  useEffect(() => {
    if (isDone) {
      startAnimation(30);
    } else {
      startAnimation(0);
    }
  }, [isDone, isChecked]);

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
      onPress={() => {
        startAnimation()
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

