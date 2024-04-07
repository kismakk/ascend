import React, { useState } from "react";
import { View, Text, Button } from "react-native";
import { useTheme } from "../../hooks/ThemeContext";
import getDynamicStyles from './TaskTop.styles';


const TaskTop = () => {
  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <View style={styles.image}></View>
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
  );
};

export default TaskTop;