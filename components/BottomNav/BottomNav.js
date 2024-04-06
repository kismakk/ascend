import { View, Text, Pressable } from "react-native";
import React from "react";
import { FontAwesome6, FontAwesome, AntDesign } from "@expo/vector-icons";
import { useTheme } from "../../hooks/ThemeContext";
import getDynamicStyles from './BottomNav.styles';
import { COLORS } from "../../constants/theme";


export default function BottomNav({ navigation, setToDoModalVisible, setHabitModalVisible }) {
  const { theme } = useTheme();
  const styles = getDynamicStyles(theme);
  const currentScreen = navigation.getState().routes[navigation.getState().index].name
  const themeBackgroundColor = COLORS[theme].text;
  const plusBackgroundColor = COLORS[theme].background;
  const isHabitsActive = currentScreen === "Habits";
  const isToDoActive = currentScreen === "ToDo";


  return (
    <View style={styles.bottomNav}>
      <Pressable
        onPress={() => {
          navigation.navigate("Habits");
        }}
      >
        <View style={styles.buttons}>
          <FontAwesome6 name="hand-holding-heart" size={30} color={isHabitsActive ? COLORS[theme].secondary : themeBackgroundColor} />
          <Text style={[styles.text, isHabitsActive && { color: COLORS[theme].secondary }]}>Habits</Text>
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          if (currentScreen === "Habits") {
            setHabitModalVisible(true)
          } else {
            setToDoModalVisible(true)
          }
        }}
      >
        <View style={styles.plus}>
          <AntDesign name="pluscircleo" size={30} color={plusBackgroundColor} />
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("ToDo");
        }}
      >
        <View style={styles.buttons}>
          <FontAwesome name="check-circle-o" size={30} color={isToDoActive ? COLORS[theme].secondary : themeBackgroundColor} />
          <Text style={[styles.text, isToDoActive && { color: COLORS[theme].secondary }]}>To Do's</Text>
        </View>
      </Pressable>
    </View>
  );
}
