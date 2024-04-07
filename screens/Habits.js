import React, { useState } from "react";
import { ScrollView, Text, Button, StyleSheet, Dimensions, View } from "react-native";
import { useTheme } from "../hooks/ThemeContext";
import { COLORS, FONTWEIGHT, SIZES } from "../constants/theme";
import NavModal from "../components/NavModal/NavModal";
import BottomNav from "../components/BottomNav/BottomNav";
import ModifyHabitModal from '../components/ModifyHabit/ModifyHabitModal';
import HabitBar from "../components/HabitBar/HabitBar";
import HabitModal from '../components/HabitModal/HabitModal';
import TaskTop from "../components/TaskTop/TaskTop";

const Habits = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [habitModalVisible, setHabitModalVisible] = useState(false);
  const [todoModalVisible, setToDoModalVisible] = useState(false);
  const [modifyHabitModalVisible, setModifyHabitModalVisible] = useState(false);
  const { theme } = useTheme();

  const dynamicStyles = getDynamicStyles(theme);

  return (
    <View style={dynamicStyles.container}>
      <ScrollView contentContainerStyle={dynamicStyles.container}>
        <TaskTop />
        <NavModal
          navigation={navigation}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <ModifyHabitModal
          navigation={navigation}
          modalVisible={modifyHabitModalVisible}
          setModalVisible={setModifyHabitModalVisible}
        />
        <HabitBar />
        <HabitBar />
        <HabitBar />
        <HabitBar />
        <HabitBar />
        <HabitBar />
        <HabitBar />
        <HabitBar />
        <HabitModal
          habitModalVisible={habitModalVisible}
          setHabitModalVisible={setHabitModalVisible}
        />
      </ScrollView>
      <BottomNav
        navigation={navigation}
        setHabitModalVisible={setHabitModalVisible}
        setToDoModalVisible={setToDoModalVisible}
      />
    </View>
  );
};

const getDynamicStyles = (theme) => {
  const window = Dimensions.get("window");

  return StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: COLORS[theme].background,
      alignItems: "center",
      paddingBottom: 40,
    },
    text: {
      fontSize: SIZES.medium,
      fontWeight: FONTWEIGHT.bold,
      color: COLORS[theme].text,
    },
    top: {
      alignSelf: "flex-start",
      paddingTop: 20,
    },
  });
};

export default Habits;