import React, { useState } from 'react';
import { useTheme } from '../hooks/ThemeContext';
import { View, Text, Button, StyleSheet, Image } from 'react-native';
import { COLORS, FONTWEIGHT, SIZES, BORDER } from '../constants/theme';
import NavModal from '../components/NavModal/NavModal';

const Profile = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { theme } = useTheme();
    const dynamicStyles = getDynamicStyles(theme);

    return (
    <View style={dynamicStyles.container}>
        <Image
            source={{
            uri: "https://i.kym-cdn.com/entries/icons/facebook/000/031/003/cover3.jpg"
            }}
            style={dynamicStyles.image}
        />
      <Text style={dynamicStyles.text}>Username</Text>
      <Button title="Nav" onPress={() => setModalVisible(true)} />
      <NavModal
        navigation={navigation}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
        
    );
}

const getDynamicStyles = (theme) => {
    return StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: COLORS[theme].background,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 150 ,
      },
      text: {
        fontSize: SIZES.medium,
        fontWeight: FONTWEIGHT.bold,
        color: COLORS[theme].text,
      },
      image: {
        width: 101, 
        height: 101, 
    },
    });
  };
export default Profile;