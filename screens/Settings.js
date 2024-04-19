import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Image, Dimensions, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../hooks/ThemeContext';
import { COLORS, FONTWEIGHT, SIZES, BORDER } from '../constants/theme';
import profileImages from '../constants/profileImage';
import { useProfile } from '../hooks/ProfileContext';

const Settings = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { theme, setTheme } = useTheme();
  const { profileImage, setProfileImage } = useProfile();
  const [imageModalVisible, setImageModalVisible] = useState(false);

  const dynamicStyles = getDynamicStyles(theme);

  const handleThemeChange = (itemValue) => {
    setTheme(itemValue);
  };

  const toggleImageModal = () => {
    setImageModalVisible(!imageModalVisible);
  };

  const onImageSelect = (image) => {
    setProfileImage(image.source);
    toggleImageModal();
  };

  return (
    <View style={dynamicStyles.container}>
      <View style={dynamicStyles.main}>
        <View style={dynamicStyles.box}>
          <Image
            style={dynamicStyles.Image}
            source={profileImage}
          />
          <TouchableOpacity onPress={toggleImageModal}>
            <Text style={dynamicStyles.text}>Modify Image</Text>
          </TouchableOpacity>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={imageModalVisible}
        onRequestClose={toggleImageModal}
      >
        <View style={dynamicStyles.modalView}>
          <ScrollView contentContainerStyle={dynamicStyles.scrollView}>
            {profileImages.map((image) => (
              <TouchableOpacity
                key={image.id}
                style={dynamicStyles.imageContainer}
                onPress={() => onImageSelect(image)}
              >
                <Image
                  source={image.source}
                  style={dynamicStyles.modalImage}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <Button title="Close" onPress={toggleImageModal} />
        </View>
      </Modal>
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
      marginBottom: 20
    },
    box: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 20,
      paddingBottom: 50
    },
    cont: {
      backgroundColor: COLORS[theme].primary,
      padding: 20,
      height: 100,
      borderRadius: 5,
      marginBottom: 20,
    },
    Image: {
      width: 150,
      height: 150,
    },
    danger: {
      backgroundColor: COLORS[theme].primary,
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
    },
    modalView: {
      margin: 20,
      backgroundColor: COLORS[theme].background,
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    scrollView: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center'
    },
    imageContainer: {
      alignItems: 'center',
      marginVertical: 10,
    },
    modalImage: {
      width: 120,
      height: 120,
      margin: 8,
      borderRadius: 75,
    }
  });
};

export default Settings;
