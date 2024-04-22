import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { COLORS, FONTWEIGHT, SIZES } from '../constants/theme';
import NavModal from '../components/NavModal/NavModal';
import ToDoStat from '../components/ToDoStat/ToDoStat';
import HabitStat from '../components/HabitStat/HabitStat';
import { COLLECTION } from '../constants/collections';
import { useTheme } from '../hooks/ThemeContext';
import useFirestore from '../hooks/useFirestore';
import useFirebaseAuth from '../hooks/useFirebaseAuth';

const Profile = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { theme } = useTheme();
  const dynamicStyles = getDynamicStyles(theme);
  const { user } = useFirebaseAuth();

  const { data, loading, error, fetchData } = useFirestore();

  useEffect(() => {
    fetchData(COLLECTION.TODOS);
  }, []);

  return (
    <ScrollView>
      <SafeAreaView style={dynamicStyles.container}>
        <View style={dynamicStyles.avatarUsername}>
          <Image source={Number(user?.photoURL)} style={dynamicStyles.image} />
          <Text style={dynamicStyles.text}>{user ? user.displayName : 'Loading...'}</Text>
        </View>
        <View style={dynamicStyles.headerPosition}>
          <Text style={dynamicStyles.text}>Statistics:</Text>
        </View>
        <View style={dynamicStyles.todochart}>{data && <ToDoStat data={data} />}</View>
        <View style={dynamicStyles.habitchart}>
          <HabitStat />
        </View>
        <NavModal
          navigation={navigation}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </SafeAreaView>
    </ScrollView>
  );
};

const getDynamicStyles = (theme) => {
  const { width } = Dimensions.get('window');
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS[theme].background,
      alignItems: 'center',
      justifyContent: 'center',
    },
    avatarUsername: {
      paddingTop: 50,
      paddingBottom: 70,
      alignItems: 'center'
    },
    text: {
      fontSize: SIZES.medium,
      fontWeight: FONTWEIGHT.bold,
      color: COLORS[theme].text,
      paddingTop: 10
    },
    headerPosition: {
      width: '100%',
      alignItems: 'center',
      paddingBottom: 20
    },
    image: {
      backgroundColor: COLORS[theme].secondary,
      width: 150,
      height: 150,
    },
    todochart: {
      paddingRight: 40,
      paddingBottom: 20
    },
    habitchart: {
      paddingRight: 40,
      paddingBottom: 20
    }
  });
};

export default Profile;
