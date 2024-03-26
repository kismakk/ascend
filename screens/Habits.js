<<<<<<< HEAD
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/ThemeContext';
import { COLORS, FONTWEIGHT, SIZES, BORDER } from '../constants/theme';
import NavModal from '../components/NavModal/NavModal';
import HabitModal from '../components/HabitModal/HabitModal';
=======
import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useTheme } from "../hooks/ThemeContext";
import { COLORS, FONTWEIGHT, SIZES, BORDER } from "../constants/theme";
import NavModal from "../components/NavModal/NavModal";
import BottomNav from "../components/BottomNav/BottomNav";
>>>>>>> 7a5639710f5a73fc02493788809739c1e00bb70e

const Habits = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [habitModalVisible, setHabitModalVisible] = useState(false);
  const { theme } = useTheme();

  const dynamicStyles = getDynamicStyles(theme);

  return (
    <View style={dynamicStyles.container}>
      <Text style={dynamicStyles.text}>Habits</Text>
      <Button title="Nav" onPress={() => setModalVisible(true)} />
      <NavModal
        navigation={navigation}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
<<<<<<< HEAD
      <Button
        title="Add Habit"
        onPress={() => setHabitModalVisible(true)}
      />
      <HabitModal
        habitModalVisible={habitModalVisible}
        setHabitModalVisible={setHabitModalVisible}
      />
=======
      <BottomNav navigation={navigation} />
>>>>>>> 7a5639710f5a73fc02493788809739c1e00bb70e
    </View>
  );
};

const getDynamicStyles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS[theme].background,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      fontSize: SIZES.medium,
      fontWeight: FONTWEIGHT.bold,
      color: COLORS[theme].text,
    },
  });
};

export default Habits;
