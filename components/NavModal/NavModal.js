import React from 'react';
import { View, Button, Modal, StyleSheet } from 'react-native';
import styles from './NavModal.styles';

const NavModal = ({ navigation, modalVisible, setModalVisible }) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.backdrop} onTouchEnd={() => setModalVisible(false)} />
        <View style={styles.modalView}>
          <Button title="Home" onPress={() => {
            navigation.navigate('Home');
            setModalVisible(false);
          }} />
          <Button title="Habits" onPress={() => {
            navigation.navigate('Habits');
            setModalVisible(false);
          }} />
          <Button title="ToDo" onPress={() => {
            navigation.navigate('ToDo');
            setModalVisible(false);
          }} />
          <Button title="Settings" onPress={() => {
            navigation.navigate('Settings');
            setModalVisible(false);
          }} />

          <Button title="Close" onPress={() => setModalVisible(!modalVisible)} />
        </View>
      </View>
    </Modal>
  );
};

export default NavModal;