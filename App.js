import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Habits from './screens/Habits';
import Home from './screens/Home';
import Settings from './screens/Settings';
import ToDo from './screens/ToDo';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Habits'
      >
        <Stack.Screen name='Habits' component={Habits} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Settings' component={Settings} />
        <Stack.Screen name='ToDo' component={ToDo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}