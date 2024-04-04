import { View, Text, Button, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import SignInModal from '../components/AuthModals/SignInModal/SignInModal';
import useFirestore from '../hooks/useFirestore';

const mockData = {
  title: 'Test firebase',
  description: 'Go to console',
};

const SignIn = () => {
  const [signInModalVisible, setSignInModalVisible] = useState(false);
  const [docId, setDocId] = useState('');

  const { user, signIn, signUp, signOut, authError } = useFirebaseAuth();

  const { data, fetchData, addData, loading, dbError, updateData, deleteData } =
    useFirestore('Todos');

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
      <Button title="Open Modal" onPress={() => setSignInModalVisible(!signInModalVisible)} />
      <SignInModal
        signInModalVisible={signInModalVisible}
        setSignInModalVisible={setSignInModalVisible}
        handleSignIn={handleSignInButtonClick}
        handleSignUp={handleSignUpButtonClick}
      />
      {data && console.log(JSON.stringify(data, null, 2))}
      {dbError && <Text>{dbError}</Text>}
      {loading && <Text>Loading...</Text>}
      {docId && console.log(docId)}
      {!loading &&
        data &&
        data.map((todo) => (
          <Pressable key={todo.id} onPress={() => setDocId(todo.id)}>
            <Text>{todo.title}</Text>
          </Pressable>
        ))}
      <Button title="Get data from firestore" onPress={() => fetchData()} />
      <Button title="Add document to firestore" onPress={() => addData(mockData)} />
      <Button
        title="Update document"
        onPress={() => updateData({ title: 'Hello world!' }, docId)}
      />
      <Button title="Delete document" onPress={() => deleteData(docId)} />
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
    paddingBottom: 20,
  },
  input: {
    height: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});
export default SignIn;
