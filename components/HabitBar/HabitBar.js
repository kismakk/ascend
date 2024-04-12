import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { useTheme } from "../../hooks/ThemeContext";
import getDynamicStyles from './HabitBar.styles';
import ModifyHabitModal from '../ModifyHabit/ModifyHabitModal';


const HabitBar = ({ navigation, data }) => {
  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);
  const [modifyHabitModalVisible, setModifyHabitModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {!data.isBad && (
        <View style={styles.PosButton}>
          <View style={styles.posNegBase}>
            <Text style={styles.Pos}>+</Text>
          </View>
        </View>
      )}
      {data.isBad && (
        <View style={styles.NegButton}>
          <View style={styles.posNegBase}>
            <Text style={styles.Neg}>-</Text>
          </View>
        </View>
      )}
      <Text style={styles.text} onPress={() => setModifyHabitModalVisible(true)}>
        {data.title}
      </Text>
      <ModifyHabitModal
        navigation={navigation}
        modalVisible={modifyHabitModalVisible}
        setModalVisible={setModifyHabitModalVisible}
        data={data}
      />

    </View>
  );
};

export default HabitBar;