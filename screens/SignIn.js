import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import useFirebaseAuth from "../hooks/useFirebaseAuth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, signIn, signUp, signOut, error } = useFirebaseAuth()

  const handleSignInButtonClick = () => {
    signIn(email, password);
  };

  const handleSignOutButtonClick = () => {
    signOut();
  };

  const handleSignUpButtonClick = () => {
    signUp(email, password);
  };

  if (user) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Welcome!</Text>
        <Text>{user.email}</Text>
        <Button title={"Sign Out"} onPress={handleSignOutButtonClick} />
      </View>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
      accessible={false}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.title}>Sign In</Text>
        <Text>Email</Text>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize={"none"}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <Text>Password</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        <Button title={"Sign In"} onPress={handleSignInButtonClick} />
        <Text style={styles.title}>Sign Up</Text>
        <Text>Email</Text>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize={"none"}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <Text>Password</Text>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
        <Button title={"Sign Up"} onPress={handleSignUpButtonClick} />
        {error && <Text>{error}</Text>}
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
export default SignIn;
