import { useState } from 'react';
import useFirebaseAuth from './useFirebaseAuth';
import {
  firestore,
  collection,
  query,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from '../firebase/config';

/**
 * Custom hook for interacting with Firestore.
 *
 * @returns {object} - An object containing the data, loading state, error, and functions for fetching and adding documents.
 */
export default function useFirestore() {
  const { user } = useFirebaseAuth();

  const [data, setData] = useState([]);
  const [dbError, setDbError] = useState(null);
  const [loading, setLoading] = useState(false);

  const collectionProvided = (collectionName) => {
    if (!collectionName) {
      console.error('ERROR: Missing Firestore collection');
      setDbError('Something went wrong');
      return false;
    }

    return true;
  };

  const clearError = () => {
    setDbError(null);
  };

  /**
   * Fetches data from a Firestore collection.
   * @param {string} collectionName - The name of the Firestore collection to fetch data from.
   */
  const fetchData = async (collectionName) => {
    clearError();
    if (!collectionProvided(collectionName)) {
      return;
    }

    setLoading(true);
    try {
      const dataQuery = query(collection(firestore, collectionName));

      const querySnapshot = await getDocs(dataQuery);

      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setData(newData);
    } catch (error) {
      console.error(error);
      setDbError(error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Adds data to a Firestore collection.
   *
   * @param {string} collectionName - The name of the Firestore collection.
   * @param {Object} data - The data to be added to the collection.
   */
  const addData = async (collectionName, data) => {
    clearError();
    if (!collectionProvided(collectionName)) {
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(firestore, collectionName), data);

      await fetchData(collectionName);
    } catch (error) {
      console.error(error);
      setDbError(error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Updates data in a Firestore collection.
   *
   * @param {string} collectionName - The name of the Firestore collection.
   * @param {Object} data - The data to be updated.
   * @param {string} documentId - The ID of the document to be updated.
   */
  const updateData = async (collectionName, data, documentId) => {
    clearError();
    if (!collectionProvided(collectionName)) {
      return;
    }

    setLoading(true);
    try {
      const docRef = doc(firestore, collectionName, documentId);
      await updateDoc(docRef, data);

      await fetchData(collectionName);
    } catch (error) {
      console.error(error);
      setDbError(error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Deletes a document from Firestore.
   *
   * @param {string} collectionName - The name of the Firestore collection.
   * @param {string} documentId - The ID of the document to be deleted.
   */
  const deleteData = async (collectionName, documentId) => {
    clearError();
    if (!collectionProvided(collectionName)) {
      return;
    }

    setLoading(true);
    try {
      const docRef = doc(firestore, collectionName, documentId);
      await deleteDoc(docRef);

      await fetchData(collectionName);
    } catch (error) {
      console.error(error);
      setDbError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, dbError, fetchData, addData, updateData, deleteData };
}
