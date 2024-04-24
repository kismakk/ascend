import { useState } from 'react';
import {
  firestore,
  collection,
  query,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  where,
  auth,
} from '../firebase/config';
import { COLLECTION } from '../constants/collections';


/**
 * Custom hook for interacting with Firestore.
 * 
 * @returns {{
 *  data: Array,
 *  habitPointsData: Array,
 *  loading: boolean,
 *  dbError: string | null,
 *  fetchData: (collectionName: string) => void,
 *  addData: (collectionName: string, data: Object) => void,
 *  updateData: (collectionName: string, data: Object, documentId: string) => void,
 *  deleteData: (collectionName: string, documentId: string) => void
 * }}
 */
export default function useFirestore() {
  const [data, setData] = useState([]);
  const [habitPointsData, setHabitPointsData] = useState([]);
  const [dbError, setDbError] = useState(null);
  const [loading, setLoading] = useState(false);

  const user = auth.currentUser;

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
      const dataQuery = query(
        collection(firestore, collectionName),
        where('userId', '==', user.uid)
      );

      const querySnapshot = await getDocs(dataQuery);

      const newData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      if(collectionName === COLLECTION.HABITPOINTS) {
        setHabitPointsData(newData);
      } else {
        setData(newData);
      }
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

    data = {
      userId: user.uid,
      ...data,
    };

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

  return { data, habitPointsData, loading, dbError, fetchData, addData, updateData, deleteData };
}
