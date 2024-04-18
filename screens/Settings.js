import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Alert,
  ScrollView,
  SafeAreaView,
  TextInput,
  Pressable,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../hooks/ThemeContext';
import { COLORS, FONTWEIGHT, SIZES, BORDER } from '../constants/theme';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import deleteUsersData from '../firebase/util/deleteUsersData';
import { auth } from '../firebase/config';

const userSchema = yup.object().shape({
  username: yup.string().max(15, 'Username cannot be longer than 15 characters'),
});

const Settings = ({ navigation }) => {
  const [isEditing, setIsEditing] = useState(false);

  const { theme, setTheme } = useTheme();
  const { user, loading, authError, deleteUserData, updateUserInformation } = useFirebaseAuth();

  const dynamicStyles = getDynamicStyles(theme);

  const handleThemeChange = (itemValue) => {
    setTheme(itemValue);
  };

  const handleProfileInfoChange = (formData) => {
    updateUserInformation(formData);
    setIsEditing(false);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      username: user?.displayName,
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.safeAreaContainer}>
      <ScrollView contentContainerStyle={dynamicStyles.container}>
        <View style={dynamicStyles.main}>
          <View style={dynamicStyles.box}>
            <Image
              style={dynamicStyles.Image}
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
            />
            <Text style={dynamicStyles.headerText}>Modify Image</Text>
          </View>
          <View style={dynamicStyles.cont}>
            <Text style={dynamicStyles.headerText}>USERNAME</Text>
            {loading ? (
              <Text style={dynamicStyles.text}>Loading...</Text>
            ) : isEditing ? (
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field: { onChange, value } }) => (
                  <View style={{ paddingTop: 10 }}>
                    <TextInput
                      autoCapitalize="none"
                      color={dynamicStyles.text.color}
                      onChangeText={onChange}
                      placeholder={user?.displayName}
                      value={value}
                    />
                    {errors.username && (
                      <Text style={dynamicStyles.errorText}>{errors.username.message}</Text>
                    )}
                  </View>
                )}
                name="username"
              />
            ) : (
              <Text style={dynamicStyles.text}>{user?.displayName}</Text>
            )}
          </View>
          <View style={dynamicStyles.cont}>
            <Text style={dynamicStyles.headerText}>EMAIL</Text>
            <Text style={dynamicStyles.text}>{user?.email}</Text>
          </View>
        </View>
        {isEditing ? (
          <View style={dynamicStyles.editButtonGroup}>
            <Pressable onPress={handleSubmit(handleProfileInfoChange)} style={dynamicStyles.button}>
              <Text style={dynamicStyles.buttonText}>Save</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                reset();
                setIsEditing(false);
              }}
              style={dynamicStyles.button}
            >
              <Text style={dynamicStyles.buttonText}>Cancel</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable onPress={() => setIsEditing(true)} style={dynamicStyles.button}>
            <Text style={dynamicStyles.buttonText}>Edit profile</Text>
          </Pressable>
        )}
        {authError && <Text style={dynamicStyles.errorText}>{authError}</Text>}
        <View style={dynamicStyles.theme}>
          <Text style={dynamicStyles.headerText}>Theme</Text>
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
            <Text style={dynamicStyles.headerText}>Reset Stats</Text>
            <Text
              style={dynamicStyles.headerText}
              onPress={() => {
                Alert.alert('Delete account', 'This will permanently delete your account', [
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
                ]);
              }}
            >
              Delete Account
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const getDynamicStyles = (theme) => {
  const { height, width } = Dimensions.get('window');
  return StyleSheet.create({
    safeAreaContainer: {
      flex: 1,
      backgroundColor: COLORS[theme].background,
    },
    container: {
      flexGrow: 1,
      backgroundColor: COLORS[theme].background,
      alignItems: 'center',
      width: width,
      height: height * 1.05, // Multiplied by 1.05 to make bottom of the screen visible, very hacky atm
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
    headerText: {
      fontSize: SIZES.medium,
      fontWeight: FONTWEIGHT.bold,
      color: COLORS[theme].text,
    },
    text: {
      fontSize: 14,
      color: COLORS[theme].text,
      paddingTop: 10,
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
      height: 120,
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
    errorText: {
      paddingTop: 5,
      color: COLORS[theme].red,
    },
    editButtonGroup: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 20,
    },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      padding: 12,
      borderRadius: 10,
      backgroundColor: COLORS[theme].secondary,
    },
    buttonText: {
      fontSize: 16,
      color: COLORS[theme].text,
    },
  });
};

export default Settings;
