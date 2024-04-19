import { View, Text } from "react-native";
import React, { useState } from "react";
import { useTheme } from "../../hooks/ThemeContext";
import getDynamicStyles from "./TodoBar.styles";
import ModifyTaskModal from "../ModifyTask/ModifyTaskModal";
import CheckBox from "./CheckBox";
import useFirestore from '../../hooks/useFirestore';
import { COLLECTION } from '../../constants/collections';

export default function ToDoBar({navigation, data}) {
  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);
  const [modifyTaskModalVisible, setModifyTaskModalVisible] = useState(false);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const { updateData, } = useFirestore();
  const todoId = data?.id;

  const taskDone = (formData) => {
    if (!data.isDone) {
      const updateFormData = {
        ...formData,
        isDone: true,
        doneDate: new Date().toISOString()
      }
      updateData(COLLECTION.TODOS, updateFormData, todoId);
      setModifyTaskModalVisible(false);
    } else {
      const updateFormData = {
        ...formData,
        isDone: null,
        doneDate: null
      }
      updateData(COLLECTION.TODOS, updateFormData, todoId);
      setModifyTaskModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.todobar}>
        <View style={styles.checkbox}>
        <CheckBox 
        isChecked={toggleCheckBox}
        onPress={() => {
          setToggleCheckBox(!toggleCheckBox)
          taskDone(data)
        }}
        isDone={data.isDone}
        />
        </View>
        <Text
          onPress={() => {
            setModifyTaskModalVisible(true)
          }}
          style={styles.text}
        >
          {data.title}
        </Text>
        {modifyTaskModalVisible && 
          <ModifyTaskModal
          navigation={navigation}
          modalVisible={modifyTaskModalVisible}
          setModalVisible={setModifyTaskModalVisible}
          data={data}
        />
        }
        
      </View>
    </View>
  );
}
