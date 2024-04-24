import { useEffect, useState } from 'react';
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  deleteUser,
  updateProfile,
} from '../firebase/config';

/**
 * @typedef {Object} FirebaseUser
 * @property {string} uid - The user's unique identifier.
 * @property {string} displayName - The user's display name.
 * @property {string} email - The user's email address.
 * @property {string} emailVerified - Indicates whether the user's email has been verified.
 * @property {string} photoURL - The URL of the user's profile picture.
 * @property {string} providerData - An array of UserInfo objects representing the providers linked to the user's account.
 * @property {function} delete - Deletes the user account (async).
 * @property {function} getIdToken - Returns a JWT token used to identify the user to a Firebase service (async).
 */


/**
 * Custom hook for handling Firebase authentication.
 * @returns {{
 *   user: FirebaseUser | null,
 *   authError: string | null,
 *   loading: boolean,
 *   signIn: (email: string, password: string) => void,
 *   signOut: () => void,
 *   signUp: (email: string, password: string) => void,
 *   deleteUserData: () => void,
 *   updateUserInformation: (data: { username?: string, avatarUrl?: string }) => void
 * }} The user authentication state and related functions.
 */
export default function useFirebaseAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  /**
   * Effect hook to listen for changes in the user's authentication state.
   */
  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(handleUser);

    return unsubscribe;
  }, []);

  /**
   * Updates the user state with the provided user object.
   * @param {FirebaseUser | null} user The user object to set in the state, or null to clear the user state.
   */
  const handleUser = (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  };

  /**
   * Handles the error returned by Firebase authentication.
   *
   * @param {string} error - The error code returned by Firebase authentication.
   */
  const handleError = (error) => {
    let errorMessage = '';

    switch (error) {
      case 'auth/email-already-in-use':
        errorMessage = 'This email is already in use by another account.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'The email address is not valid.';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'Email/password accounts are not enabled.';
        break;
      case 'auth/weak-password':
        errorMessage = 'The password is too weak.';
        break;
      case 'auth/user-disabled':
        errorMessage = 'This user has been disabled.';
        break;
      case 'auth/user-not-found':
        errorMessage = 'User not found.';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Email or password is invalid.';
        break;
      default:
        errorMessage = 'Something went wrong, try again later.';
        break;
    }

    setAuthError(errorMessage);
  };

  /**
   * Clears the error state.
   */
  const clearError = () => {
    setAuthError(null);
  };

  /**
   * Signs in a user with the provided email and password.
   * @param {string} email The user's email.
   * @param {string} password The user's password.
   */
  const signIn = (email, password) => {
    clearError();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        handleUser(user);
      })
      .catch((error) => handleError(error.code));
  };

  /**
   * Sign up a new user with the provided email and password.
   * When creating a new user, the start of the email address is used as a username
   *
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   *
   */
  const signUp = (email, password) => {
    clearError();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        handleUser(user);
        updateUserInformation({
          username: email.split('@')[0],
        });
      })
      .catch((error) => handleError(error.code));
  };

  /**
   * Signs out the current user.
   */
  const signOut = () => {
    clearError();
    auth
      .signOut()
      .then(() => {
        handleUser(null);
      })
      .catch((error) => handleError(error.code));
  };

  /**
   * Updates the user information with the provided data.
   *
   * @param {Object} data - The data containing the user information to update.
   * @param {string} data.username - The new username for the user.
   * @param {string} data.avatarUrl - The new avatar URL for the user.
   */
  const updateUserInformation = (data) => {
    clearError();
    setLoading(true);
    const profileData = {
      ...(data.username && { displayName: data.username }),
      ...(data.avatarUrl && { photoURL: data.avatarUrl }),
    };

    updateProfile(auth.currentUser, profileData)
      .then(() => {
        console.log('Profile updated succesfully');
        setLoading(false);
      })
      .catch((error) => {
        handleError(error.code);
        console.log('Profile updated non-succesfully');
        setLoading(false);
      });
  };

  /**
   * Deletes the user.
   */
  const deleteUserData = () => {
    const user = auth.currentUser;

    deleteUser(user)
      .then(() => {
        console.log('User deleted succesfully');
        setLoading(false);
      })
      .catch((error) => {
        handleError(error.code);
        console.log(`Error deleting user ${user.displayName}`);
        setLoading(false);
      });
  };

  return {
    user,
    authError,
    loading,
    signIn,
    signOut,
    signUp,
    deleteUserData,
    updateUserInformation,
  };
}
