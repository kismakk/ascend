import { View, Text, Pressable } from "react-native";
import React from "react";
import { FontAwesome6, FontAwesome, AntDesign } from "@expo/vector-icons";
import styles from "../BottomNav/BottomNav.styles";

export default function BottomNav({ navigation, setToDoModalVisible, setHabitModalVisible }) {
  
  const currentScreen = navigation.getState().routes[navigation.getState().index].name
  
  return (
    <View style={styles.bottomNav}>
      <Pressable
        onPress={() => {
          navigation.navigate("Habits");
        }}
      >
        <View style={styles.buttons}>
          <FontAwesome6 name="hand-holding-heart" size={30} color="black" />
          <Text>Habits</Text>
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
        <View>
          <AntDesign name="pluscircleo" size={30} color="black" />
        </View>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("ToDo");
        }}
      >
        <View style={styles.buttons}>
          <FontAwesome name="check-circle-o" size={30} color="black" />
          <Text>To Do's</Text>
        </View>
      </Pressable>
    </View>
  );
}
