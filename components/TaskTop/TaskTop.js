import React, { useState } from "react";
import { View, Text, Button, Image, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/theme";
import { useTheme } from "../../hooks/ThemeContext";
import getDynamicStyles from './TaskTop.styles';
import NavModal from "../NavModal/NavModal";
import { FontAwesome } from "@expo/vector-icons";
import { useProfile } from "../../hooks/ProfileContext";


const TaskTop = (navigation) => {
  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);
  const [modalVisible, setModalVisible] = useState(false);
  const navIconColor = COLORS[theme].secondary;
  const { profileImage } = useProfile();

  return (
    <View style={styles.base}>
      <View style={styles.nav}>
        <FontAwesome name="navicon" size={30}
          onPress={() => setModalVisible(true)}
          color={navIconColor}
        />
        <NavModal
          navigation={navigation}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
        <Text style={styles.username}>USERNAME</Text>
      </View>
      <View style={styles.container}>
        <Image
          source={profileImage}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <View style={styles.header}>
            <Text style={styles.text}>THIS WEEK</Text>
          </View>
          <View style={styles.stats}>
            <Text style={styles.text}>Habits:</Text>
            <Text style={styles.text}>To Do's:</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TaskTop;