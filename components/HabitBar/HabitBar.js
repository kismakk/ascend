import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { useTheme } from "../../hooks/ThemeContext";
import getDynamicStyles from './HabitBar.styles';
import ModifyHabitModal from '../ModifyHabit/ModifyHabitModal';


const HabitBar = (navigation) => {
  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);
  const [modifyHabitModalVisible, setModifyHabitModalVisible] = useState(false);


  return (
    <View style={styles.container}>
      <View style={styles.PosButton}>
        <View style={styles.posNegBase}>
          <Text style={styles.Pos}>+</Text>
        </View>
      </View>
      <Text style={styles.text}
        onPress={() => setModifyHabitModalVisible(true)}>Habit Bar Title fdfdsgads gdsaf asdf asdf dasd
        ffa fsdf fdf daf fadsfas afds fdsfsdf fsdfs dsf fsdf </Text>
      <ModifyHabitModal
        navigation={navigation}
        modalVisible={modifyHabitModalVisible}
        setModalVisible={setModifyHabitModalVisible}
      />
      <View style={styles.NegButton}>
        <View style={styles.posNegBase}>
          <Text style={styles.Neg}>-</Text>
        </View>
      </View>
    </View>
  );
};

export default HabitBar;