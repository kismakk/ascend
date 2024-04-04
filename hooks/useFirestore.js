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
 * @param {string} collectionName - The name of the Firestore collection.
 * @returns {object} - An object containing the data, loading state, error, and functions for fetching and adding documents.
 */
export default function useFirestore(collectionName) {
  const { user } = useFirebaseAuth();

  const [data, setData] = useState([]);
  const [dbError, setDbError] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Fetches data from Firestore collection and updates the component state.
   */
  const fetchData = async () => {
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
   * Adds data to the Firestore collection.
   *
   * @param {Object} data - The data object, containing the document fields, to be added to the collection.
   */
  const addData = async (data) => {
    setLoading(true);
    try {
      await addDoc(collection(firestore, collectionName), data);

      await fetchData();
    } catch (error) {
      console.error(error);
      setDbError(error.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Updates data in Firestore for a specific document.
   *
   * @param {Object} data - The updated data to be saved.
   * @param {string} documentId - The ID of the document to be updated.
   */
  const updateData = async (data, documentId) => {
    setLoading(true);
    try {
      const docRef = doc(firestore, collectionName, documentId);
      await updateDoc(docRef, data);

      await fetchData();
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
   * @param {string} documentId - The ID of the document to be deleted.
   */
  const deleteData = async (documentId) => {
    setLoading(true);
    try {
      const docRef = doc(firestore, collectionName, documentId);
      await deleteDoc(docRef);

      await fetchData();
    } catch (error) {
      console.error(error);
      setDbError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, dbError, fetchData, addData, updateData, deleteData };
}
