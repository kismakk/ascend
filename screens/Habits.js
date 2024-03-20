import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/ThemeContext';
import { COLORS, FONTWEIGHT, SIZES, BORDER } from '../constants/theme';
import NavModal from '../components/NavModal/NavModal';

const Habits = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { theme } = useTheme();

  const dynamicStyles = getDynamicStyles(theme);

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.text}>Habits</Text>
      <Button
        title="Nav"
        onPress={() => setModalVisible(true)}
      />
      <NavModal
        navigation={navigation}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  );
};

const getDynamicStyles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS[theme].background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: SIZES.medium,
      fontWeight: FONTWEIGHT.bold,
      color: COLORS[theme].text,
    },
  });
};

export default Habits;