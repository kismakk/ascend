import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../hooks/ThemeContext';
import { COLORS, FONTWEIGHT, SIZES } from '../constants/theme';
import NavModal from '../components/NavModal/NavModal';
import BottomNav from '../components/BottomNav/BottomNav';
import ModifyHabitModal from '../components/ModifyHabit/ModifyHabitModal';
import HabitBar from '../components/HabitBar/HabitBar';
import HabitModal from '../components/HabitModal/HabitModal';
import TaskTop from '../components/TaskTop/TaskTop';
import useFirestore from '../hooks/useFirestore';

const Habits = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [habitModalVisible, setHabitModalVisible] = useState(false);
  const [todoModalVisible, setToDoModalVisible] = useState(false);
  const [modifyHabitModalVisible, setModifyHabitModalVisible] = useState(false);
  const { theme } = useTheme();

  const { data, fetchData, loading, error } = useFirestore();

  useEffect(() => {
    fetchData('Habits');
  }, []);

  const dynamicStyles = getDynamicStyles(theme);

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.container}>
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
        {error && <Text>{error}</Text>}
        {loading && !data && <ActivityIndicator size={'large'} />}
        {data && (
          <FlatList
            data={data}
            renderItem={(habit) => <HabitBar data={habit} />}
            keyExtractor={(habit) => habit.id}
          />
        )}
        <HabitModal
          habitModalVisible={habitModalVisible}
          setHabitModalVisible={setHabitModalVisible}
        />
      </View>
      <BottomNav
        navigation={navigation}
        setHabitModalVisible={setHabitModalVisible}
        setToDoModalVisible={setToDoModalVisible}
      />
    </View>
  );
};

const getDynamicStyles = (theme) => {
  const window = Dimensions.get('window');

  return StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: COLORS[theme].background,
      alignItems: 'center',
      paddingBottom: 40,
    },
    text: {
      fontSize: SIZES.medium,
      fontWeight: FONTWEIGHT.bold,
      color: COLORS[theme].text,
    },
    top: {
      alignSelf: 'flex-start',
      paddingTop: 20,
    },
  });
};

export default Habits;
