import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { useTheme } from '../../hooks/ThemeContext';
import getDynamicStyles from './HabitBar.styles';
import ModifyHabitModal from '../ModifyHabit/ModifyHabitModal';
import useFirestore from '../../hooks/useFirestore';
import { COLLECTION } from '../../constants/collections';

const HabitBar = ({ navigation, data }) => {
  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);
  const [modifyHabitModalVisible, setModifyHabitModalVisible] = useState(false);
  const { addData } = useFirestore();

  const getCurrentDate = () => {
    const date = new Date(Date.now())

    return date.toISOString()
  }

  return (
    <View style={styles.container}>
      {!data.isBad && (
        <View style={styles.PosButton}>
          <TouchableOpacity
            style={styles.posNegBase}
            onPress={() => {
              /* Lähetä data firestoreen */
              const date = getCurrentDate()
              addData(COLLECTION.HABITPOINTS, {
                points: data.points,
                isBad: false,
                date: date,
              });
              console.log(data);
            }}
          >
            <Text style={styles.Pos}>+</Text>
          </TouchableOpacity>
        </View>
      )}
      {data.isBad && (
        <View style={styles.NegButton}>
          <TouchableOpacity
            style={styles.posNegBase}
            onPress={() => {
              /* Lähetä data firestoreen */
              const date = getCurrentDate();
              addData(COLLECTION.HABITPOINTS, {
                points: data.points,
                isBad: true,
                date: date,
              });
              console.log(data);
            }}
          >
            <Text style={styles.Neg}>-</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text
        style={styles.text}
        onPress={() => setModifyHabitModalVisible(true)}
      >
        {data.title}
      </Text>
      {modifyHabitModalVisible && (
        <ModifyHabitModal
          navigation={navigation}
          modalVisible={modifyHabitModalVisible}
          setModalVisible={setModifyHabitModalVisible}
          data={data}
        />
      )}
    </View>
  );
};

export default HabitBar;
