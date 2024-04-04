import { useEffect, useState } from 'react';
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
 * A custom React hook for handling user authentication using Firebase.
 * Provides functions for signing in, signing up, and signing out,
 * as well as the current user state and any authentication errors.
 *
 * @returns {{
 *   user: FirebaseUser | null, // The current authenticated user, or null if no user is authenticated.
 *   error: string | null,        // Any authentication error message, or null if no error occurred.
 *   signIn: (email: string, password: string) => void, // Function to sign in a user with email and password.
 *   signUp: (email: string, password: string) => void, // Function to sign up a user with email and password.
 *   signOut: () => void           // Function to sign out the current user.
 * }}
 */
export default function useFirebaseAuth() {
  const [user, setUser] = useState(null);
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
   * Sets the error state with the provided error message.
   * @param {string | null} error The error message to set in the state, or null to clear the error state.
   */
  const handleError = (error) => {
    setAuthError(error);
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
      .catch((error) => handleError(error.message));
  };

  /**
   * Signs up a new user with the provided email and password.
   * @param {string} email The user's email.
   * @param {string} password The user's password.
   */
  const signUp = (email, password) => {
    clearError();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        handleUser(user);
      })
      .catch((error) => handleError(error.message));
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
      .catch((error) => handleError(error.message));
  };

  return { user, error: authError, signIn, signOut, signUp };
}
