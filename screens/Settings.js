import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Dimensions } from 'react-native';
import { useTheme } from '../hooks/ThemeContext';
import { COLORS, FONTWEIGHT, SIZES, BORDER } from '../constants/theme';
import NavModal from '../components/NavModal/NavModal';

const Settings = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { theme } = useTheme();

  const dynamicStyles = getDynamicStyles(theme);

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
          <Text>Modify Image</Text>
        </View>
        <View style={dynamicStyles.cont}>
          <Text style={dynamicStyles.text}>USERNAME</Text>
        </View>
        <View style={dynamicStyles.cont}>
          <Text style={dynamicStyles.text}>EMAIL</Text>
        </View>
      </View>
      <View style={dynamicStyles.danger}>
        <View style={dynamicStyles.zone}>
          <Text style={dynamicStyles.text}>Danger Zone</Text>
          <Text style={dynamicStyles.text}>Reset Stats</Text>
          <Text style={dynamicStyles.text}>Delete Account</Text>
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
      justifyContent: 'space-between'

    },
    main: {
      width: width,
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: width * 0.8,
    },
    text: {
      fontSize: SIZES.medium,
      fontWeight: FONTWEIGHT.bold,
      color: COLORS[theme].text,
    },
    box: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 20,
      paddingBottom: 50
    },
    cont: {
      backgroundColor: COLORS[theme].secondary,
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
      backgroundColor: COLORS[theme].secondary,
      width: width,
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 150,
      borderTopWidth: 2,
      borderColor: 'red',
      paddingTop: 10
    },
    zone: {
      width: width * 0.6,
    }
  });
};

export default Settings;
