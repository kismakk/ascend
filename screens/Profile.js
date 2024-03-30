import React, { useState } from 'react';
import { useTheme } from '../hooks/ThemeContext';
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { COLORS, FONTWEIGHT, SIZES, BORDER } from '../constants/theme';
import NavModal from '../components/NavModal/NavModal';
import ToDoStat from '../components/ToDoStat/ToDoStat';
import HabitStat from '../components/HabitStat/HabitStat';


const Profile = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const { theme } = useTheme();
    const dynamicStyles = getDynamicStyles(theme);

    return (
    <ScrollView>
      <View style={dynamicStyles.container}>
        <View style={dynamicStyles.avatarUsername}>
          <Image
                source={{
                uri: "empty"
                }}
                style={dynamicStyles.image}
            />
            <Text style={dynamicStyles.text}>Username</Text>
        </View>
        <View style={dynamicStyles.headerPosition}>
          <Text style= {dynamicStyles.text}>Statistics:</Text>
        </View>
        <View style={dynamicStyles.todochart}>
          <ToDoStat/> 
        </View>
        <View style={dynamicStyles.habitchart}>
          <HabitStat/>
        </View>
        <Button title="Nav" onPress={() => setModalVisible(true)} />
        <NavModal
          navigation={navigation}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
    </View>
    </ScrollView>
    );
}

const getDynamicStyles = (theme) => {
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
        paddingRight: 305,
        paddingBottom: 20
      },
      image: {
        borderColor: 'black',
        borderWidth: 0.5,
        width: 101, 
        height: 101,
      },
     todochart: {
        paddingBottom: 70,
        paddingRight: 80
      },
      habitchart: {
        paddingBottom: 70,
        paddingRight: 80

      }
    });
  };
export default Profile;
