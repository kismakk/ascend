import React from 'react';
import { View, Button, Modal, Text } from 'react-native';
import { useTheme } from "../../hooks/ThemeContext";
import getDynamicStyles from './ModifyHabitModal.styles';

const ModifyHabitModal = ({ modalVisible, setModalVisible }) => {

  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => { !modalVisible }}
    >
      <View style={styles.centeredView}>
        <View style={styles.backdrop} onTouchEnd={() => setModalVisible(false)} />
        <View style={styles.modalView}>
        </View>
        <View style={styles.top}>
          <Button title="Back" onPress={() => setModalVisible(!modalVisible)} />
          <View style={styles.topButtons}>
            <Text style={styles.text}>MODIFY</Text>
            <Text style={styles.text}>DELETE</Text>
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
            <View style={styles.circle}>
              <Text style={styles.text}>+</Text>
            </View>
            <View style={styles.circle}>
              <Text style={styles.text}>-</Text>
            </View>
          </View>
          <Text style={styles.text}>DIFFICULTY</Text>
          <View style={styles.difficultyOption}>
            <View style={styles.difficultyBox}>
              <Text style={styles.text}>EASY</Text>
            </View>
            <View style={styles.difficultyBox}>
              <Text style={styles.text}>MEDIUM</Text>
            </View>
            <View style={styles.difficultyBox}>
              <Text style={styles.text}>HARD</Text>
            </View>
          </View>
        </View>

      </View>

    </Modal>
  );
};


export default ModifyHabitModal;