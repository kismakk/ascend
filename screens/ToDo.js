import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme } from '../hooks/ThemeContext';
import { COLORS, FONTWEIGHT, SIZES, BORDER } from '../constants/theme';
import NavModal from '../components/NavModal/NavModal';
import BottomNav from '../components/BottomNav/BottomNav';
import ToDoModal from '../components/ToDoModal/ToDoModal';
import ModifyTaskModal from '../components/ModifyTask/ModifyTaskModal';
import TaskTop from "../components/TaskTop/TaskTop";


const ToDo = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [todoModalVisible, setToDoModalVisible] = useState(false);
  const [habitModalVisible, setHabitModalVisible] = useState(false);
  const [modifyTaskModalVisible, setModifyTaskModalVisible] = useState(false);
  const { theme } = useTheme();

  const dynamicStyles = getDynamicStyles(theme);

  return (
    <View style={dynamicStyles.container}>
      <TaskTop />
      <NavModal
        navigation={navigation}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <BottomNav
        navigation={navigation}
        setToDoModalVisible={setToDoModalVisible}
        setHabitModalVisible={setHabitModalVisible}
      />
      <ModifyTaskModal
        navigation={navigation}
        modalVisible={modifyTaskModalVisible}
        setModalVisible={setModifyTaskModalVisible}
      />
      <Button
        title="Add To Do"
        onPress={() => setToDoModalVisible(true)}
      />
      <Button 
        title='Modify Task'
        onPress={() => setModifyTaskModalVisible(true)}
      />
      <ToDoModal
        todoModalVisible={todoModalVisible}
        setToDoModalVisible={setToDoModalVisible}
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
      paddingBottom: 40,
    },
    text: {
      fontSize: SIZES.medium,
      fontWeight: FONTWEIGHT.bold,
      color: COLORS[theme].text,
    },
  });
};

export default ToDo;
