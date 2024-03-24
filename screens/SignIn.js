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
import {
  authorization,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
} from "../firebase/config";

const SignIn = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const signIn = () => {
    signInWithEmailAndPassword(authorization, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Logged in as:", user.email);
        setUser(user);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const signOut = () => {
    firebaseSignOut(authorization)
      .then(() => {
        console.log("Logged out");
        setLoggedIn(false);
        setUser(null);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const signUp = () => {
    createUserWithEmailAndPassword(authorization, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Signed up as:", user.email);
        setUser(user);
        setLoggedIn(true);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  if (loggedIn) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Welcome!</Text>
        <Text>{user.email}</Text>
        <Button title={"Sign Out"} onPress={signOut} />
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
        <Button title={"Sign In"} onPress={signIn} />
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
        <Button title={"Sign Up"} onPress={signUp} />
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
