import React from 'react';
import { View, Button, Modal, Text } from 'react-native';
import getDynamicStyles from './NavModal.styles';
import { useTheme } from "../../hooks/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';


const NavModal = ({ modalVisible, setModalVisible }) => {

  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);
  const navIconColor = COLORS[theme].text;
  const navigation = useNavigation();

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
          <View style={styles.navTop}>
            <View style={styles.image}></View>
            <Text style={styles.username}>USERNAME</Text>
          </View>
          <View style={styles.navItem}>
            <Text style={styles.navText}
              onPress={() => {
                navigation.navigate('Profile');
                setModalVisible(false);
              }}
            >Profile</Text>
            <Ionicons name="person" size={25}
              color={navIconColor}
            />

          </View>
          <View style={styles.navItem}>
            <Text style={styles.navText}
              onPress={() => {
                navigation.navigate('Settings');
                setModalVisible(false);
              }}
            >Settings</Text>
            <Ionicons name="settings" size={25}
              color={navIconColor}
            />
          </View>
          <View style={styles.navBottom}>
            <Text style={styles.navText}
              onPress={() => {
                navigation.navigate('Sign In');
                setModalVisible(false);
              }}
            >Sign In</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NavModal;