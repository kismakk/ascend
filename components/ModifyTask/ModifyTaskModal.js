import React from 'react';
import { View, Button, Modal, SafeAreaView, Text } from 'react-native';
import { useTheme } from "../../hooks/ThemeContext";
import getDynamicStyles from './ModifyTaskModal.styles';
import styles from './ModifyTaskModal.styles';
import { AntDesign } from "@expo/vector-icons";
import { COLORS } from '../../constants/theme';

const ModifyTaskModal = ({ modalVisible, setModalVisible }) => {

  const { theme } = useTheme();
  const IconColor = COLORS[theme].secondary;
  const styles = getDynamicStyles(theme);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <SafeAreaView style={styles.centeredView}>
        <View style={styles.backdrop} onTouchEnd={() => setModalVisible(false)} />
        <View style={styles.modalView}>
        </View>
        <View style={styles.top}>
          <AntDesign name="arrowleft" size={24} color={IconColor}
            onPress={() => setModalVisible(!modalVisible)} />
          <View style={styles.topButtons}>
            <Text style={styles.modify}>MODIFY</Text>
            <Text style={styles.delete}>DELETE</Text>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.cont}>
            <Text style={styles.text}>TITLE</Text>
          </View>
          <View style={styles.cont}>
            <Text style={styles.text}>NOTES</Text>
          </View>
          <View style={styles.posNeg}>
            <View style={styles.PosCircle}>
              <Text style={styles.text}>+</Text>
            </View>
            <View style={styles.NegCircle}>
              <Text style={styles.text}>-</Text>
            </View>
          </View>
          <Text style={styles.text}>DIFFICULTY</Text>
          <View style={styles.difficultyOption}>
            <View style={styles.easyDifficultyBox}>
              <Text style={styles.text}>EASY</Text>
            </View>
            <View style={styles.mediumDifficultyBox}>
              <Text style={styles.text}>MEDIUM</Text>
            </View>
            <View style={styles.hardDifficultyBox}>
              <Text style={styles.text}>HARD</Text>
            </View>
          </View>
          <View style={styles.cont}>
            <Text style={styles.text}>Due Date:</Text>
          </View>
        </View>

      </SafeAreaView>
    </Modal>
  );
};

export default ModifyTaskModal;