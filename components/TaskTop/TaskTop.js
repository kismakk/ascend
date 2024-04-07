import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { COLORS } from "../../constants/theme";
import { useTheme } from "../../hooks/ThemeContext";
import getDynamicStyles from './TaskTop.styles';
import NavModal from "../NavModal/NavModal";
import { FontAwesome } from "@expo/vector-icons";


const TaskTop = (navigation) => {
  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);
  const [modalVisible, setModalVisible] = useState(false);
  const navIconColor = COLORS[theme].secondary;

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
        <View style={styles.image}>
        </View>
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