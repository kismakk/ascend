import React from 'react';
import { View, Button, Modal } from 'react-native';
import styles from './ToDoModal.styles';

const ToDoModal = ({ todoModalVisible, setToDoModalVisible }) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={todoModalVisible}
      onRequestClose={() => {
        setToDoModalVisible(!todoModalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.backdrop} onTouchEnd={() => setToDoModalVisible(false)} />
        <View style={styles.modalView}>
          <Button title="Close ToDo" onPress={() => setToDoModalVisible(!todoModalVisible)} />
        </View>
      </View>
    </Modal>
  );
};

export default ToDoModal;