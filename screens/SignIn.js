import { useState } from 'react';
import useFirebaseAuth from '../hooks/useFirebaseAuth';
import SignInModal from '../components/AuthModals/SignInModal/SignInModal';

const SignIn = () => {
  const [modalVisible, setModalVisible] = useState(true);

  const { signIn, signUp, authError } = useFirebaseAuth();

  const handleSignIn = (data) => {
    const { email, password } = data;
    signIn(email, password);
    setModalVisible(!modalVisible);
  };

  const handleSignUp = (data) => {
    const { email, password } = data;
    signUp(email, password);
    setModalVisible;
  };

  return (
    <SignInModal
      signInModalVisible={modalVisible}
      setSignInModalVisible={setModalVisible}
      handleSignIn={handleSignIn}
      handleSignUp={handleSignUp}
      authError={authError}
    />
  );
};
export default SignIn;
