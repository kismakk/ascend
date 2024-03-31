import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import SignInModal from '../components/AuthModals/SignInModal/SignInModal';

const SignIn = () => {
  const [signInModalVisible, setSignInModalVisible] = useState(false);

  const { user, signIn, signUp, signOut, error } = useFirebaseAuth();

  const handleSignInButtonClick = (formData) => {
    const { email, password } = formData;
    signIn(email, password);
  };

  const handleSignOutButtonClick = () => {
    signOut();
  };

  const handleSignUpButtonClick = (formData) => {
    const { email, password } = formData;
    signUp(email, password);
  };

  if (user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Welcome!</Text>
        <Text>{user.email}</Text>
        <Button title={'Sign Out'} onPress={handleSignOutButtonClick} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button
        title="Open Modal"
        onPress={() => setSignInModalVisible(!signInModalVisible)}
      />
      <SignInModal
        signInModalVisible={signInModalVisible}
        setSignInModalVisible={setSignInModalVisible}
        handleSignIn={handleSignInButtonClick}
        handleSignUp={handleSignUpButtonClick}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
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
