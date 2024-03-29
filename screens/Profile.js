import React, { useState } from 'react';
import { useTheme } from '../hooks/ThemeContext';
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';
import { COLORS, FONTWEIGHT, SIZES, BORDER } from '../constants/theme';
import NavModal from '../components/NavModal/NavModal';
import ToDoStat from '../components/ToDoStat/ToDoStat';


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
                uri: "https://i.kym-cdn.com/entries/icons/facebook/000/031/003/cover3.jpg"
                }}
                style={dynamicStyles.image}
            />
          <Text style={dynamicStyles.text}>Mike</Text>
        </View>
        <Text style= {dynamicStyles.chart}>Statistics</Text>
        <View style={dynamicStyles.statistics}>
          <ToDoStat/> 
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
        paddingBottom: 100,
        alignItems: 'center'
        
      },
      text: {
        fontSize: SIZES.medium,
        fontWeight: FONTWEIGHT.bold,
        color: COLORS[theme].text,
        paddingTop: 10
      },
      image: {
        borderColor: 'black',
        borderWidth: 0.5,
        width: 101, 
        height: 101,
      },
      statistics: {
        paddingRight: 80
      }
    });
  };
export default Profile;
