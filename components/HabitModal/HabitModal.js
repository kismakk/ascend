import React from 'react';
import { View, Button, Modal } from 'react-native';
import styles from './HabitModal.styles';

const HabitModal = ({ habitModalVisible, setHabitModalVisible }) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={habitModalVisible}
      onRequestClose={() => {
        setHabitModalVisible(!habitModalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.backdrop} onTouchEnd={() => setHabitModalVisible(false)} />
        <View style={styles.modalView}>
          <Button title="Close" onPress={() => setHabitModalVisible(!habitModalVisible)} />
        </View>
      </View>
    </Modal>
  );
};

export default HabitModal;