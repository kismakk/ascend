import React, { useState } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../hooks/ThemeContext';
import { COLORS, FONTWEIGHT, SIZES, BORDER } from '../constants/theme';
import NavModal from '../components/NavModal/NavModal';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import deleteUsersData from '../firebase/util/deleteUsersData';
import { auth } from '../firebase/config';

const Settings = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { theme, setTheme } = useTheme();
  const { deleteUserData } = useFirebaseAuth();
  const user = auth.currentUser;

  const dynamicStyles = getDynamicStyles(theme);

  const handleThemeChange = (itemValue) => {
    setTheme(itemValue);
  };

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.main}>
        <View style={dynamicStyles.box}>
          <Image
            style={dynamicStyles.Image}
            source={{
              uri: 'https://reactnative.dev/img/tiny_logo.png',
            }}
          />
          <Text style={dynamicStyles.text}>Modify Image</Text>
        </View>
        <View style={dynamicStyles.cont}>
          <Text style={dynamicStyles.text}>USERNAME</Text>
        </View>
        <View style={dynamicStyles.cont}>
          <Text style={dynamicStyles.text}>EMAIL</Text>
        </View>
      </View>
      <View style={dynamicStyles.theme}>
        <Text style={dynamicStyles.text}>Theme</Text>
        <Picker
          selectedValue={theme}
          onValueChange={handleThemeChange}
          style={{ width: 150, color: COLORS[theme].text }}
          itemStyle={{
            color: COLORS[theme].text,
          }}
        >
          <Picker.Item label="Light" value="light" />
          <Picker.Item label="Dark" value="dark" />
          <Picker.Item label="Easter" value="easter" />
          <Picker.Item label="Blue" value="blue" />
          <Picker.Item label="Miami" value="miami" />
          <Picker.Item label="Candy" value="candy" />
        </Picker>
      </View>
      <View style={dynamicStyles.danger}>
        <View style={dynamicStyles.zone}>
          <Text style={dynamicStyles.dangerText}>Danger Zone</Text>
          <Text style={dynamicStyles.text}>Reset Stats</Text>
          <Text
            style={dynamicStyles.text}
            onPress={() => {
              Alert.alert(
                'Delete account',
                'This will permanently delete your account',
                [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      deleteUsersData(user.uid);
                    },
                  },
                ]
              );
            }}
          >
            Delete Account
          </Text>
        </View>
      </View>
    </View>
  );
};

const getDynamicStyles = (theme) => {
  const { height, width } = Dimensions.get('window');
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS[theme].background,
      alignItems: 'center',
      width: width,
      height: height,
      justifyContent: 'space-between',
    },
    main: {
      width: width,
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: width * 0.8,
    },
    theme: {
      width: width,
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: width * 0.8,
      padding: 20,
      alignContent: 'center',
    },
    text: {
      fontSize: SIZES.medium,
      fontWeight: FONTWEIGHT.bold,
      color: COLORS[theme].text,
    },
    dangerText: {
      fontSize: SIZES.large,
      fontWeight: FONTWEIGHT.bold,
      color: 'red',
      marginBottom: 20,
    },
    box: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 20,
      paddingBottom: 50,
    },
    cont: {
      backgroundColor: COLORS[theme].primary,
      padding: 20,
      height: 100,
      borderRadius: 5,
      marginBottom: 20,
    },
    Image: {
      width: 101,
      height: 101,
    },
    danger: {
      backgroundColor: COLORS[theme].primary,
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 150,
      borderTopWidth: 2,
      borderColor: 'red',
      paddingTop: 10,
    },
    zone: {
      width: width * 0.6,
    },
  });
};

export default Settings;
