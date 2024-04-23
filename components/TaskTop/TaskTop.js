import React, { useState, useEffect } from "react";
import { View, Text, Button, Image, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/theme";
import { useTheme } from "../../hooks/ThemeContext";
import getDynamicStyles from './TaskTop.styles';
import NavModal from "../NavModal/NavModal";
import { FontAwesome } from '@expo/vector-icons';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import { COLLECTION } from "../../constants/collections";
import {
  auth,
  collection,
  firestore,
  onSnapshot,
  query,
  where,
} from '../../firebase/config'

const TaskTop = (navigation) => {
  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);
  const [modalVisible, setModalVisible] = useState(false);
  const navIconColor = COLORS[theme].secondary;
  const { user } = useFirebaseAuth();
  const [habitData, setHabitData] = useState([])
  const [todoData, setTodoData] = useState([])

  
  useEffect(() => {
    const user = auth.currentUser;
    const habitsQuery = query(
      collection(firestore, COLLECTION.HABITPOINTS),
      where('userId', '==', user.uid)
    );
    const todosQuery = query(
      collection(firestore, COLLECTION.TODOS),
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
      const points = calculatePoints(tempHabits);
      setHabitData(points);
    });
    const unsubscribeTodos = onSnapshot(todosQuery, (querySnapshot) => {
      const tempTodos = [];

      querySnapshot.forEach((doc) => {
        const todoObject = {
          id: doc.id,
          ...doc.data(),
        };
        tempTodos.push(todoObject);
      });
      const points = calculateTodoPoints(tempTodos);
      setTodoData(points);
    });
    return () => {
      unsubscribe(),
      unsubscribeTodos()
    }
  }, []);

  const calculatePoints = (habits) => {
    let points = 0;

    habits.forEach(habits => {
      if (habits.isBad === false) {
        points += parseInt(habits.points)
      } else {
        points -= parseInt(habits.points)
      }
    })
    return points;
  }

    const calculateTodoPoints = (todos) => {
      let points = 0;

      todos.forEach((todos) => {
        if (todos.isDone === true) {
          points += parseInt(todos.points);
        }
      });
      return points;
    };

  return (
    <View style={styles.base}>
      <View style={styles.nav}>
        <FontAwesome
          name="navicon"
          size={30}
          onPress={() => setModalVisible(true)}
          color={navIconColor}
        />
        <NavModal
          navigation={navigation}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <Text style={styles.username}>{user ? user.displayName : 'Loading...'}</Text>
      </View>
      <View style={styles.container}>
        <Image source={Number(user?.photoURL)} style={styles.image} />
        <View style={styles.textContainer}>
          <View style={styles.header}>
            <Text style={styles.text}>TODAY</Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.text}>Habits: {habitData}</Text>
            <Text style={styles.text}>To Do's:{todoData}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TaskTop;