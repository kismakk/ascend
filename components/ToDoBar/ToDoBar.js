import { View, Text } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../hooks/ThemeContext";
import getDynamicStyles from "./TodoBar.styles";
import ModifyTaskModal from "../ModifyTask/ModifyTaskModal";
import CheckBox from "./CheckBox";

export default function ToDoBar({navigation, data}) {
  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);
  const [modifyTaskModalVisible, setModifyTaskModalVisible] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.todobar}>
        <View style={styles.checkbox}>
        <CheckBox 
        isChecked={toggleCheckBox}
        onPress={() => {setToggleCheckBox(!toggleCheckBox)}}
        />
        </View>
        <Text
          onPress={() => {
            setModifyTaskModalVisible(true);
          }}
          style={styles.text}
        >
          {data.title}
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
