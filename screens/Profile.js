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
  const [isLoading, setIsLoading] = useState(true);

  const { data, habitPointsData, fetchData } = useFirestore()
  const { user } = useFirebaseAuth();

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setIsLoading(true);
        const habitPointsData = await fetchData(COLLECTION.HABITPOINTS);
        const todosData = await fetchData(COLLECTION.TODOS);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchDataAsync();
  }, []);

  return (
    <ScrollView>
      <SafeAreaView style={dynamicStyles.container}>
        <View style={dynamicStyles.avatarUsername}>
          <Image source={Number(user?.photoURL)} style={dynamicStyles.image} />
          <Text style={dynamicStyles.text}>{user ? user.displayName : 'Loading...'}</Text>
        </View>
        <View style={dynamicStyles.headerPosition}>
          <Text style={dynamicStyles.header}>Statistics:</Text>
        </View>
        <View style={dynamicStyles.todochart}>
          {!isLoading &&
            <ToDoStat data={data} />
          }
        </View>
        <View style={dynamicStyles.habitchart}>
          {!isLoading &&
            <HabitStat data={habitPointsData} />
          }
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
      paddingBottom: 20,
      alignItems: 'center'
    },
    text: {
      fontSize: SIZES.large,
      fontWeight: FONTWEIGHT.bold,
      color: COLORS[theme].text,
      paddingTop: 10
    },
    header: {
      fontSize: SIZES.medium,
      fontWeight: FONTWEIGHT.bold,
      color: COLORS[theme].text,
      paddingTop: 30
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
      borderRadius: 10,
      overflow: 'hidden',
    },
    todochart: {
      paddingRight: 40,
      paddingBottom: 40
    },
    habitchart: {
      paddingRight: 40,
      paddingBottom: 20
    }
  });
};

export default Profile;
