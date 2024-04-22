import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './hooks/ThemeContext';
import Habits from './screens/Habits';
import Home from './screens/Home';
import Settings from './screens/Settings';
import ToDo from './screens/ToDo';
import Profile from './screens/Profile';
import SignIn from './screens/SignIn';
import useFirebaseAuth from './hooks/useFirebaseAuth';
import { ProfileProvider } from './hooks/ProfileContext';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <ProfileProvider>
      <Stack.Navigator initialRouteName="Habits">
        <Stack.Screen name="Habits" component={Habits} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Settings" component={Settings} />
        <Stack.Screen name="ToDo" component={ToDo} />
      </Stack.Navigator>
    </ProfileProvider>
  );
};

const SignInStack = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="Sign In" component={SignIn} />
    </Stack.Navigator>
  );
};

export default function App() {
  const { user } = useFirebaseAuth();

  return (
    <ThemeProvider>
      <NavigationContainer>{user ? <AuthStack /> : <SignInStack />}</NavigationContainer>
    </ThemeProvider>
  );
}