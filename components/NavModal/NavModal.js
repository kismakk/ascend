import React from 'react';
import { View, Button, Modal, Text, SafeAreaView, Image } from 'react-native';
import getDynamicStyles from './NavModal.styles';
import { useTheme } from "../../hooks/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from '../../constants/theme';
import { useNavigation } from '@react-navigation/native';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import useFirestore from '../../hooks/useFirestore';
import { useProfile } from "../../hooks/ProfileContext";

const NavModal = ({ modalVisible, setModalVisible }) => {
  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);
  const navIconColor = COLORS[theme].text;
  const navigation = useNavigation();
  const { profileImage } = useProfile();
  const { signOut } = useFirebaseAuth();
  const { user } = useFirebaseAuth();

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
          <View style={styles.navTop}>
            <Image
              source={profileImage}
              style={styles.image}
            />
            <Text style={styles.username}>{user ? user.displayName : "Loading..."}</Text>
          </View>
          <View style={styles.navItem}>
            <Text
              style={styles.navText}
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
            <Text
              style={styles.navText}
              onPress={() => {
                navigation.navigate('Settings');
                setModalVisible(false);
              }}
            >
              Settings
            </Text>
            <Ionicons name="settings" size={25} color={navIconColor} />
          </View>
          <View style={styles.navBottom}>
            <Text
              style={styles.navText}
              onPress={() => {
                signOut();
                setModalVisible(false);
              }}
            >
              Sign Out
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default NavModal;