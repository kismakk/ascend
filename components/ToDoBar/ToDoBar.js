import { View, Text } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../hooks/ThemeContext";
import getDynamicStyles from "./TodoBar.styles";
import ModifyTaskModal from "../ModifyTask/ModifyTaskModal";
import Checkbox from "expo-checkbox";
import { COLORS } from "../../constants/theme";

export default function ToDoBar(navigation) {
  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);
  const [modifyTaskModalVisible, setModifyTaskModalVisible] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.todobar}>
        <View style={styles.checkbox}>
        <Checkbox
          disabled={false}
          value={toggleCheckBox}
          onValueChange={(newValue) => setToggleCheckBox(newValue)}
          
        />
        </View>
        <Text
          onPress={() => {
            setModifyTaskModalVisible(true);
          }}
          style={styles.text}
        >
          Muista juoda vettä :D
        </Text>
        <ModifyTaskModal
          navigation={navigation}
          modalVisible={modifyTaskModalVisible}
          setModalVisible={setModifyTaskModalVisible}
        />
      </View>
    </View>
  );
}
