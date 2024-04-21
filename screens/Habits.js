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
import HabitBar from '../components/HabitBar/HabitBar';
import HabitModal from '../components/HabitModal/HabitModal';
import TaskTop from '../components/TaskTop/TaskTop';
import useFirestore from '../hooks/useFirestore';
import { COLLECTION } from '../constants/collections';
import {
  auth,
  collection,
  firestore,
  onSnapshot,
  query,
  where,
} from '../firebase/config';

const Habits = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [habitModalVisible, setHabitModalVisible] = useState(false);
  const [todoModalVisible, setToDoModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const { theme } = useTheme();

  const dynamicStyles = getDynamicStyles(theme);
  const { loading, error } = useFirestore();

  useEffect(() => {
    const user = auth.currentUser;
    const habitsQuery = query(
      collection(firestore, COLLECTION.HABITS),
      where('userId', '==', user.uid)
    );
    const unsubscribe = onSnapshot(habitsQuery, (querySnapshot) => {
      const tempHabits = [];

      querySnapshot.forEach((doc) => {
        const habitObject = {
          id: doc.id,
          ...doc.data(),
        };
        tempHabits.push(habitObject);
      });
      setData(tempHabits);
    });
    return unsubscribe;
  }, []);

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.container}>
        <TaskTop />
        <NavModal
          navigation={navigation}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        {error && <Text>{error}</Text>}
        {loading ? (
          <ActivityIndicator size={'large'} />
        ) : data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={(habit) => <HabitBar data={habit.item} />}
            keyExtractor={(habit) => habit.id}
          />
        ) : (
          <Text style={dynamicStyles.emptyText}>No Habits yet</Text>
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
    emptyText: {
      fontSize: SIZES.medium,
      fontWeight: FONTWEIGHT.bold,
      color: COLORS[theme].text,
      paddingTop: 20,
    },
    top: {
      alignSelf: 'flex-start',
      paddingTop: 20,
    },
  });
};

export default Habits;
