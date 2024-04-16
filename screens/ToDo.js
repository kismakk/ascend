import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { useTheme } from '../hooks/ThemeContext';
import { COLORS, FONTWEIGHT, SIZES, BORDER } from '../constants/theme';
import NavModal from '../components/NavModal/NavModal';
import BottomNav from '../components/BottomNav/BottomNav';
import ToDoModal from '../components/ToDoModal/ToDoModal';
import TaskTop from "../components/TaskTop/TaskTop";
import ToDoBar from '../components/ToDoBar/ToDoBar';
import useFirestore from '../hooks/useFirestore';
import { COLLECTION } from '../constants/collections';


const ToDo = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [todoModalVisible, setToDoModalVisible] = useState(false);
  const [habitModalVisible, setHabitModalVisible] = useState(false);
  const { theme } = useTheme();

  const dynamicStyles = getDynamicStyles(theme);
  const {data, loading, error, fetchData} = useFirestore()

  useEffect(() => {
    if (!todoModalVisible) {
    fetchData(COLLECTION.TODOS)
    }
  }, [todoModalVisible]) ;

  return (
    <View style={dynamicStyles.container}>
      <TaskTop />
      {error && <Text>{error}</Text>}
      {loading && !data && <ActivityIndicator size={'large'} />}
        {data && (
          <FlatList 
            data={data}
            renderItem={(todo) => <ToDoBar data={todo.item}/>}
            keyExtractor={(todo) => todo.id}
          />
        )}
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
